package pl.polsl.acsupport.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.polsl.acsupport.entities.Offer;
import pl.polsl.acsupport.enums.OfferStatusType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OfferDto {

    private Long id;

    private BigDecimal cost;

    private String datesBegining;

    private String datesEnd;

    private OfferStatusType statusType;

    public OfferDto(Offer offer){
        this.id = offer.getId();
        this.cost = offer.getCost();
        this.datesBegining = offer.getDatesBegining().toString();
        this.datesEnd = offer.getDatesEnd().toString();
        this.statusType = offer.getStatusType();
    }

}
