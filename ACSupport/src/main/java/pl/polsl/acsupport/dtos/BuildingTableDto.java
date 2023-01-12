package pl.polsl.acsupport.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BuildingTableDto {

    private Long buildingId;

    private String buildingName;

    private String buildingType;

    private String buildingStreet;

    private String buildingPostCode;

    private String buildingCity;

    private String buildingRegion;

    private String userData;
}
