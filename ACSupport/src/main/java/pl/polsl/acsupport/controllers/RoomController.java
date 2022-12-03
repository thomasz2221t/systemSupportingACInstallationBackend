package pl.polsl.acsupport.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.polsl.acsupport.dtos.RoomDto;
import pl.polsl.acsupport.services.RoomService;

@RequiredArgsConstructor
@RequestMapping("/room")
@RestController
@Validated
public class RoomController {

    private final RoomService roomService;

    @PreAuthorize("hasAuthority('FIND_ROOM')")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<RoomDto> findAllRooms(@PageableDefault Pageable pageable){
        return roomService.findAll(pageable);
    }

    @PreAuthorize("hasAuthority('FIND_ROOM')")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public RoomDto findRoom(@PathVariable Long id){
        return roomService.get(id);
    }

    @PreAuthorize("hasAuthority('CREATE_ROOM')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long create(@RequestBody RoomDto roomDto){
        return roomService.create(roomDto).getId();
    }

    @PreAuthorize("hasAuthority('UPDATE_ROOM')")
    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable Long id, @RequestBody RoomDto roomDto){
        roomService.update(id, roomDto);
    }

    @PreAuthorize("hasAuthority('DELETE_ROOM')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Long id){
        roomService.delete(id);
    }

    @PreAuthorize("hasAuthority('UPDATE_ROOM')")
    @PatchMapping("/{roomId}")
    @ResponseStatus(HttpStatus.OK)
    public void assignTypeToRoom(@PathVariable Long roomId, @RequestBody Long typeId){
        roomService.assignTypeToRoom(roomId, typeId);
    }

    @PreAuthorize("hasAuthority('UPDATE_ROOM')")
    @GetMapping("/{roomId}")
    @ResponseStatus(HttpStatus.OK)
    public void revertAssigningTypeFromRoom(@PathVariable Long roomId){
        roomService.revertAssigningTypeFromRoom(roomId);
    }


}
