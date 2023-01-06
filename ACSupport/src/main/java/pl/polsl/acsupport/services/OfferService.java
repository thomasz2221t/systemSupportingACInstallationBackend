package pl.polsl.acsupport.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import pl.polsl.acsupport.dtos.InstallerEquipmentDto;
import pl.polsl.acsupport.dtos.OfferDto;
import pl.polsl.acsupport.dtos.UserDto;
import pl.polsl.acsupport.entities.InstallerEquipment;
import pl.polsl.acsupport.entities.Offer;
import pl.polsl.acsupport.entities.User;
import pl.polsl.acsupport.enums.OfferStatusType;
import pl.polsl.acsupport.repositories.InstallerEquipmentRepository;
import pl.polsl.acsupport.repositories.OfferRepository;
import pl.polsl.acsupport.repositories.ServiceRepository;
import pl.polsl.acsupport.repositories.UserRepository;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class OfferService {
    private final OfferRepository offerRepository;

    private final UserService userService;

    private final UserRepository userRepository;

    private final InstallerEquipmentService installerEquipmentService;

    private final InstallerEquipmentRepository installerEquipmentRepository;

    private final ServiceService serviceService;

    private final ServiceRepository serviceRepository;

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
        offer.setDatesBegining(LocalDateTime.parse(offerDto.getDatesBegining()));
        offer.setDatesEnd(LocalDateTime.parse(offerDto.getDatesEnd()));
        offer.setStatusType(offerDto.getStatusType());
        return offerRepository.save(offer);
    }

    @Transactional
    public Offer update(Long id, OfferDto offerDto){
        Offer offer = findById(id);
        offer.setCost(offerDto.getCost());
        offer.setDatesBegining(LocalDateTime.parse(offerDto.getDatesBegining()));
        offer.setDatesEnd(LocalDateTime.parse(offerDto.getDatesEnd()));
        offer.setStatusType(offerDto.getStatusType());
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

    public OfferDto findOfferByServiceId(Long serviceId){
        pl.polsl.acsupport.entities.Service service = serviceService.findById(serviceId);
        Offer offer = service.getOffer();
        return new OfferDto(offer);
    }

    @Transactional
    public void assignServiceToOffer(Long serviceId, Long offerId){
        pl.polsl.acsupport.entities.Service service = serviceService.findById(serviceId);
        Offer offer = findById(offerId);

        service.setOffer(offer);
        offer.setService(service);
        serviceRepository.save(service);
        offerRepository.save(offer);
    }

    @Transactional
    public void revertAssigningServiceFromOffer(Long serviceId){
        pl.polsl.acsupport.entities.Service service = serviceService.findById(serviceId);
        Offer offer = service.getOffer();

        service.setOffer(null);
        offer.setService(null);
        serviceRepository.save(service);
        offerRepository.save(offer);
    }

    public UserDto findUserAssignedToOffer(Long offerId){
        Offer offer = findById(offerId);
        User user = offer.getUser();
        return new UserDto(user);
    }

    @Transactional
    public void assignUserToOffer(Long offerId, Long userId){
        Offer offer = findById(offerId);
        User user = userService.findById(userId);

        Set<Offer> offers = user.getOffers();
        offers.add(offer);
        user.setOffers(offers);

        offer.setUser(user);

        offerRepository.save(offer);
        userRepository.save(user);
    }

    @Transactional
    public void revertAssigningUserFromOffer(Long offerId){
        Offer offer = findById(offerId);
        User user = offer.getUser();

        Set<Offer> offers = user.getOffers();
        offers.remove(offer);
        user.setOffers(offers);

        offer.setUser(null);

        offerRepository.save(offer);
        userRepository.save(user);
    }

    @Transactional
    public void updateOfferStatus(Long offerId, String statusCode){
        Offer offer = findById(offerId);
        offer.setStatusType(OfferStatusType.valueOf(statusCode));
        offerRepository.save(offer);
    }
}
