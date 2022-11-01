package pl.polsl.acsupport.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.polsl.acsupport.entities.Room;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RoomDto {

    private Long id;

    private String name;

    private BigDecimal areaWidth;

    private BigDecimal areaHeight;

    private BigDecimal height;

    private String description;

    public RoomDto(Room room){
        this.id = room.getId();
        this.name = room.getName();
        this.areaWidth = room.getAreaWidth();
        this.areaHeight = room.getAreHeight();
        this.height = room.getHeight();
        this.description = room.getDescription();
    }
}
