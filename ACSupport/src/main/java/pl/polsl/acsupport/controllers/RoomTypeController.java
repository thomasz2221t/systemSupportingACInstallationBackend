package pl.polsl.acsupport.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.polsl.acsupport.dtos.RoomTypeDto;
import pl.polsl.acsupport.services.RoomTypeService;

@RequiredArgsConstructor
@RequestMapping("/roomtype")
@RestController
@Validated
public class RoomTypeController {

    private final RoomTypeService roomTypeService;

    @PreAuthorize("hasAuthority('FIND_ROOM_TYPE')")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<RoomTypeDto> findAll(@PageableDefault Pageable pageable){
        return roomTypeService.findAll(pageable);
    }

    @PreAuthorize("hasAuthority('FIND_ROOM_TYPE')")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public RoomTypeDto findRoomType(@PathVariable Long id){
        return roomTypeService.get(id);
    }


    @PreAuthorize("hasAuthoriy('CREATE_ROOM_TYPE')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long create(@RequestBody RoomTypeDto roomTypeDto){
        return roomTypeService.create(roomTypeDto).getId();
    }

    @PreAuthorize("hasAuthority('DELETE_ROOM_TYPE')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id){
        roomTypeService.delete(id);
    }
}
