package com.app.etude.etude.dto;

import com.app.etude.etude.models.Classes;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class Labelvalueclasse {
    private Long value;
    private String label;
    public static Labelvalueclasse fromEntity(Classes classes) {
        return Labelvalueclasse.builder()
                .value(classes.getId())
                .label(classes.getTitre())


                .build();
    }
}




