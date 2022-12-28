package pl.polsl.acsupport.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.polsl.acsupport.entities.ServiceType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceTypeDto {

    private Long id;

    private String name;

    public ServiceTypeDto(ServiceType serviceType){
        this.id = serviceType.getId();
        this.name = serviceType.getName();
    }
}
