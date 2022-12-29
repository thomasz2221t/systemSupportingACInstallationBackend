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

    private LocalDateTime datesBegining;

    private LocalDateTime datesEnd;

    private OfferStatusType statusType;

    private Long userId;

    public OfferDto(Offer offer){
        this.id = offer.getId();
        this.cost = offer.getCost();
        this.datesBegining = offer.getDatesBegining();
        this.datesEnd = offer.getDatesEnd();
        this.statusType = offer.getStatusType();
        this.userId = offer.getUser().getId();
    }

}
