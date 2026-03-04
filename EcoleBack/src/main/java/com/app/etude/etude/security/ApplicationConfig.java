package com.app.etude.etude.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import com.app.etude.etude.security.repository.UserRepository;
import com.app.etude.etude.security.service.UserService;

import java.util.Arrays;
import java.util.Collections;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final UserRepository repository;

    @Bean
    public UserDetailsService userDetailsService() {
      return username -> repository.findByEmail(username)
          .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    //stocker les mots de passes et coder et encoder les password 
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

   @Bean
public CorsFilter corsFilter() { 
    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    final CorsConfiguration config = new CorsConfiguration();

    config.setAllowCredentials(true);
    // commAllow both localhost and any IP (for VM access)
    //config.setAllowedOriginPatterns(Arrays.asList("*")); // This allows any origin
    //config.setAllowedHeaders(Arrays.asList("*"));
    //config.setAllowedMethods(Arrays.asList("PUT", "GET", "POST", "DELETE", "PATCH", "OPTIONS"));
    config.addAllowedOriginPattern("*");  // ← use addAllowedOriginPattern (singular)
    config.addAllowedHeader("*");         // ← use addAllowedHeader (singular)
    config.addAllowedMethod("*");         // ← use addAllowedMethod (singular)
    config.addExposedHeader("Authorization"); // ← expose auth header

    source.registerCorsConfiguration("/**", config);
    return new CorsFilter(source);
}
}
