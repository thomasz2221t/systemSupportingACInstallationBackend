package pl.polsl.acsupport.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.polsl.acsupport.entities.Service;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ServiceDto {

    private Long id;

    private String date;

    private String description;

    public ServiceDto(Service service){
        this.id = service.getId();
        this.date = service.getDate().toString();
        this.description = service.getDescription();
    }
}
