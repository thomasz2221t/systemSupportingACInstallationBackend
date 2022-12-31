package pl.polsl.acsupport.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.polsl.acsupport.entities.Building;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BuildingDto {

    private Long id;

    private String name;

    private String imagePath;

    @NotNull
    private String street;

    @NotNull
    private String postCode;

    @NotNull
    private String city;

    @NotNull
    private String region;

    private String description;

    private Long chatId;

    public BuildingDto(Building building){
        this.id = building.getId();
        this.name = building.getName();
        this.imagePath = building.getImagePath();
        this.street = building.getStreet();
        this.postCode = building.getPostCode();
        this.city = building.getCity();
        this.region = building.getRegion();
        this.description = building.getDescription();
        this.chatId = building.getChat().getId();
    }

}
