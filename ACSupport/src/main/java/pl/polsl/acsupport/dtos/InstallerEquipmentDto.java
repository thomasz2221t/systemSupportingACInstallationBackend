package pl.polsl.acsupport.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.polsl.acsupport.entities.InstallerEquipment;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InstallerEquipmentDto {

    private Long id;

    private String name;

    private BigDecimal price;

    private String producer;

    private String description;

    public InstallerEquipmentDto(InstallerEquipment installerEquipment){
        this.id = installerEquipment.getId();
        this.name = installerEquipment.getName();
        this.price = installerEquipment.getPrice();
        this.producer = installerEquipment.getProducer();
        this.description = installerEquipment.getDescription();
    }
}
