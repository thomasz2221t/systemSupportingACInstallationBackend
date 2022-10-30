package pl.polsl.acsupport.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;

@Getter
@Setter
@Entity(name="rooms")
public class Room extends BaseEntity{

    @Column
    private String name;

    @Column(name = "area_width")
    private BigDecimal areaWidth;

    @Column(name = "area_height")
    private BigDecimal areHeight;

    @Column
    private BigDecimal height;

    @Column
    private String description;

    @ManyToOne
    @JoinColumn(name="building_id")
    private Building building;
}
