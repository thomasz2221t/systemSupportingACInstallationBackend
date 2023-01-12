package pl.polsl.acsupport.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OperatorServiceDto {

    private Long id;

    private String instalationDate;

    private String clientsData;

    private Long roomId;

    private Long buildingId;

    private BigDecimal roomQubature;

    private BigDecimal requiredACPower;

    private String description;
}
