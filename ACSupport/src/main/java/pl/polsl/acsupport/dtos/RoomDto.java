package pl.polsl.acsupport.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.polsl.acsupport.entities.Room;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RoomDto {

    private Long id;

    private String name;

    @NotNull
    private BigDecimal areaWidth;

    @NotNull
    private BigDecimal areaHeight;

    @NotNull
    private BigDecimal height;

    private BigDecimal energyGivenOut;

    private BigDecimal peopleNumber;

    private String description;

    public RoomDto(Room room){
        this.id = room.getId();
        this.name = room.getName();
        this.areaWidth = room.getAreaWidth();
        this.areaHeight = room.getAreaHeight();
        this.height = room.getHeight();
        this.energyGivenOut = room.getEnergyGivenOut();
        this.peopleNumber = room.getPeopleNumber();
        this.description = room.getDescription();
    }
}
