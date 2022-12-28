package pl.polsl.acsupport.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.acsupport.dtos.OfferDto;
import pl.polsl.acsupport.entities.Offer;
import pl.polsl.acsupport.repositories.OfferRepository;

import javax.persistence.EntityNotFoundException;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class OfferService {
    private final OfferRepository offerRepository;

    private final UserService userService;

    public Offer findById(Long id){
        return offerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Offer with given id not found"));
    }

    public OfferDto get(Long id){
        final Offer offer = findById(id);
        return new OfferDto(offer);
    }

    @Transactional
    public Offer create(OfferDto offerDto){
        Offer offer = new Offer();
        offer.setCost(offerDto.getCost());
        offer.setDatesBegining(offerDto.getDatesBegining());
        offer.setDatesEnd(offerDto.getDatesEnd());
        offer.setStatusType(offerDto.getStatusType());
        offer.setUser(userService.findById(offerDto.getUserId()));
        return offerRepository.save(offer);
    }

    @Transactional
    public Offer update(Long id, OfferDto offerDto){
        Offer offer = findById(id);
        offer.setCost(offerDto.getCost());
        offer.setDatesBegining(offerDto.getDatesBegining());
        offer.setDatesEnd(offerDto.getDatesEnd());
        offer.setStatusType(offerDto.getStatusType());
        offer.setUser(userService.findById(offerDto.getUserId()));
        return offerRepository.save(offer);
    }

    @Transactional
    public void delete(Long id){
        offerRepository.delete(findById(id));
    }
}
