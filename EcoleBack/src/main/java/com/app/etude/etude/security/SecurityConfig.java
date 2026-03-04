package com.app.etude.etude.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import lombok.RequiredArgsConstructor;

@Configuration // Indique que cette classe fournit une configuration Spring
@EnableWebSecurity // Active la sécurité Web via Spring Security
@EnableMethodSecurity // Active la sécurité au niveau des méthodes (ex: @PreAuthorize)
@RequiredArgsConstructor // Génère automatiquement un constructeur avec les champs "final" (injection des dépendances)
public class SecurityConfig {

    // URLs accessibles sans authentification (liste blanche)
    private static final String[] WHITE_LIST_URL = {
        "/api/v1/verfy/**",
        "/api/v1/users/**",
        "/api/v1/User/**", // ADD THIS LINE
        "/api/v1/auth/**",
        "/api/v1/cours/**",
        "/v2/api-docs",
        "/v3/api-docs",
        "/v3/api-docs/**",
        "/swagger-resources",
        "/swagger-resources/**",
        "/configuration/ui",
        "/configuration/security",
        "/swagger-ui/**",
        "/swagger-ui.html",
        "/webjars/**",
        "/api/**",
        "/api/v1/Role/**"
    };

    private final JwtAuthenticationFilter jwtAuthFilter; // Filtre personnalisé pour extraire et valider le JWT
    private final AuthenticationProvider authenticationProvider; // Fournisseur d'authentification (ex: DaoAuthenticationProvider)
    private final LogoutHandler logoutHandler; // Handler personnalisé pour gérer la déconnexion (invalidation de token, etc.)

 @Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(AbstractHttpConfigurer::disable)
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .authorizeHttpRequests(req -> req
            .requestMatchers(WHITE_LIST_URL)
            .permitAll()
            .anyRequest()
            .authenticated()
        )
        .sessionManagement(session -> session
            .sessionCreationPolicy(STATELESS)
        )
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        .logout(logout -> logout
            .logoutUrl("/api/v1/auth/logout")
            .addLogoutHandler(logoutHandler)
            .logoutSuccessHandler((request, response, authentication) ->
                SecurityContextHolder.clearContext()
            )
        );

    return http.build();
}

@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);
    config.addAllowedOriginPattern("*");
    config.addAllowedHeader("*");
    config.addAllowedMethod("*");
    config.addExposedHeader("Authorization");
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}
}
