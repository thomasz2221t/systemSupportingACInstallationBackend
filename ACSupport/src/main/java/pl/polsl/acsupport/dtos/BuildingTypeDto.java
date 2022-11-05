package pl.polsl.acsupport.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.polsl.acsupport.entities.BuildingType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BuildingTypeDto {

    private Long id;

    private String name;

    public BuildingTypeDto(BuildingType buildingType){
        this.id = buildingType.getId();
        this.name = buildingType.getName();
    }
}
