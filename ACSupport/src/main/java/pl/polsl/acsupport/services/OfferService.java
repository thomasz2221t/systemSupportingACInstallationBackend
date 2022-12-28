package pl.polsl.acsupport.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.acsupport.dtos.InstallerEquipmentDto;
import pl.polsl.acsupport.dtos.OfferDto;
import pl.polsl.acsupport.entities.InstallerEquipment;
import pl.polsl.acsupport.entities.Offer;
import pl.polsl.acsupport.repositories.InstallerEquipmentRepository;
import pl.polsl.acsupport.repositories.OfferRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class OfferService {
    private final OfferRepository offerRepository;

    private final UserService userService;

    private final InstallerEquipmentService installerEquipmentService;

    private final InstallerEquipmentRepository installerEquipmentRepository;

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

    public Page<InstallerEquipmentDto> findAllEquipmentInOffer(Long offerId){
        Offer offer = findById(offerId);
        Set<InstallerEquipment> installerEquipments = offer.getInstallerEquipments();
        List<InstallerEquipmentDto> installerEquipmentDtos = installerEquipments
                .stream()
                .map(InstallerEquipmentDto::new)
                .collect(Collectors.toList());
        return new PageImpl<>(installerEquipmentDtos);
    }

    @Transactional
    public void assignEquipmentToOffer(Long offerId, Long equipmentId){
        Offer offer = findById(offerId);
        InstallerEquipment installerEquipment = installerEquipmentService.findById(equipmentId);

        Set<InstallerEquipment> installerEquipments = offer.getInstallerEquipments();
        installerEquipments.add(installerEquipment);
        offer.setInstallerEquipments(installerEquipments);

        Set<Offer> offers = installerEquipment.getOffers();
        offers.add(offer);
        installerEquipment.setOffers(offers);

        offerRepository.save(offer);
        installerEquipmentRepository.save(installerEquipment);
    }

    @Transactional
    public void revertAssigningEquipmentFromOffer(Long offerId, Long equipmentId){
        Offer offer = findById(offerId);
        InstallerEquipment installerEquipment = installerEquipmentService.findById(equipmentId);

        Set<InstallerEquipment> installerEquipments = offer.getInstallerEquipments();
        installerEquipments.remove(installerEquipment);
        offer.setInstallerEquipments(installerEquipments);

        Set<Offer> offers = installerEquipment.getOffers();
        offers.remove(offer);
        installerEquipment.setOffers(offers);

        offerRepository.save(offer);
        installerEquipmentRepository.save(installerEquipment);
    }

}
