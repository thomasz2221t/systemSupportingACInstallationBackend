package pl.polsl.acsupport.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.polsl.acsupport.dtos.InstallerEquipmentDto;
import pl.polsl.acsupport.dtos.OfferDto;
import pl.polsl.acsupport.dtos.UserDto;
import pl.polsl.acsupport.services.OfferService;

@RequiredArgsConstructor
@RequestMapping("/offer")
@RestController
@Validated
public class OfferController {
    private final OfferService offerService;

    @PreAuthorize("hasAuthority('FIND_OFFER')")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public OfferDto findOffer(@PathVariable Long id){
        return offerService.get(id);
    }

    @PreAuthorize("hasAuthority('CREATE_OFFER')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long create(@RequestBody OfferDto offerDto){
        return offerService.create(offerDto).getId();
    }

    @PreAuthorize("hasAuthority('UPDATE_OFFER')")
    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable Long id, @RequestBody OfferDto offerDto){
        offerService.update(id,offerDto);
    }

    @PreAuthorize("hasAuthority('DELETE_OFFER')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id){
        offerService.delete(id);
    }

    @PreAuthorize("hasAuthority('FIND_OFFER')")
    @GetMapping("/equipment/{offerId}")
    @ResponseStatus(HttpStatus.OK)
    public Page<InstallerEquipmentDto> findAllEquipmentInOffer(@PathVariable Long offerId){
        return offerService.findAllEquipmentInOffer(offerId);
    }

    @PreAuthorize("hasAuthority('UPDATE_OFFER')")
    @PatchMapping("/assignequipment/{offerId}")
    @ResponseStatus(HttpStatus.OK)
    public void assignEquipmentToOffer(@PathVariable Long offerId, @RequestBody Long equipmentId){
        offerService.assignEquipmentToOffer(offerId, equipmentId);
    }

    @PreAuthorize("hasAuthority('UPDATE_OFFER')")
    @PatchMapping("/revertequipment/{offerId}")
    @ResponseStatus(HttpStatus.OK)
    public void revertAssigningEquipmentFromOffer(@PathVariable Long offerId, @RequestBody Long equipmentId){
        offerService.revertAssigningEquipmentFromOffer(offerId, equipmentId);
    }

    @PreAuthorize("hasAuthority('FIND_OFFER')")
    @GetMapping("/service/{serviceId}")
    @ResponseStatus(HttpStatus.OK)
    public OfferDto findOfferByServiceId(@PathVariable Long serviceId){
        return offerService.findOfferByServiceId(serviceId);
    }

    @PreAuthorize("hasAuthority('UPDATE_OFFER')")
    @PatchMapping("/assignservice/{serviceId}")
    @ResponseStatus(HttpStatus.OK)
    public void assignServiceToOffer(@PathVariable Long serviceId, @RequestBody Long offerId){
        offerService.assignServiceToOffer(serviceId, offerId);
    }

    @PreAuthorize("hasAuthority('UPDATE_OFFER')")
    @PatchMapping("/revertservice/{serviceId}")
    @ResponseStatus(HttpStatus.OK)
    public void revertAssigningServiceFromOffer(@PathVariable Long serviceId){
        offerService.revertAssigningServiceFromOffer(serviceId);
    }

    @PreAuthorize("hasAuthority('FIND_OFFER')")
    @GetMapping("/user/{offerId}")
    @ResponseStatus(HttpStatus.OK)
    public UserDto findUserAssignedToOffer(@PathVariable Long offerId){
        return offerService.findUserAssignedToOffer(offerId);
    }

    @PreAuthorize("hasAuthority('UPDATE_OFFER')")
    @PatchMapping("/assignuser/{offerId}")
    @ResponseStatus(HttpStatus.OK)
    public void assignUserToOffer(@PathVariable Long offerId, @RequestBody Long userId){
        offerService.assignUserToOffer(offerId, userId);
    }

    @PreAuthorize("hasAuthority('UPDATE_OFFER')")
    @PatchMapping("/revertuser/{offerId}")
    @ResponseStatus(HttpStatus.OK)
    public void revertAssigningUserFromOffer(@PathVariable Long offerId){
        offerService.revertAssigningUserFromOffer(offerId);
    }
}
