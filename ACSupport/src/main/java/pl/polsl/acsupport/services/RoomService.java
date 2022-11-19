package pl.polsl.acsupport.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.acsupport.dtos.RoomDto;
import pl.polsl.acsupport.entities.Room;
import pl.polsl.acsupport.repositories.RoomRepository;

import javax.persistence.EntityNotFoundException;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class RoomService {

    private final RoomRepository roomRepository;

    public Page<RoomDto> findAll(Pageable pageable){
        Page<Room> rooms = roomRepository.findAll(pageable);
        return rooms.map(RoomDto::new);
    }

    public Room findById(Long id){
        return roomRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Room with given id not found"));
    }

    public RoomDto get(Long id){
        Room room = findById(id);
        return new RoomDto(room);
    }

    @Transactional
    public Room create(RoomDto roomDto){
        Room room = new Room();
        room.setName(roomDto.getName());
        room.setAreaWidth(roomDto.getAreaWidth());
        room.setAreaHeight(roomDto.getAreaHeight());
        room.setHeight(roomDto.getHeight());
        room.setDescription(roomDto.getDescription());
        return roomRepository.save(room);
    }

    @Transactional
    public Room update(Long id, RoomDto roomDto){
        Room room = findById(id);
        room.setName(roomDto.getName());
        room.setAreaWidth(roomDto.getAreaWidth());
        room.setAreaHeight(roomDto.getAreaHeight());
        room.setHeight(roomDto.getHeight());
        room.setDescription(roomDto.getDescription());
        return roomRepository.save(room);
    }

    @Transactional
    public void delete(Long id){
        roomRepository.delete(findById(id));
    }
}
