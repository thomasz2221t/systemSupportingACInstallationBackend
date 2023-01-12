package pl.polsl.acsupport.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.polsl.acsupport.entities.RoomType;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RoomTypeDto {
    private Long id;

    private String name;

    public RoomTypeDto(RoomType roomType){
        this.id = roomType.getId();
        this.name = roomType.getName();
    }
}
