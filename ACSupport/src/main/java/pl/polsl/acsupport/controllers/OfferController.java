package pl.polsl.acsupport.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.polsl.acsupport.dtos.OfferDto;
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
}
