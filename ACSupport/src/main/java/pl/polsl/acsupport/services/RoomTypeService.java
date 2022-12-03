package pl.polsl.acsupport.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.acsupport.dtos.RoomTypeDto;
import pl.polsl.acsupport.entities.RoomType;
import pl.polsl.acsupport.repositories.RoomTypeRepository;

import javax.persistence.EntityNotFoundException;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class RoomTypeService {

    private final RoomTypeRepository roomTypeRepository;

    public Page<RoomTypeDto> findAll(Pageable pageable){
        Page<RoomType> roomTypes = roomTypeRepository.findAll(pageable);
        return roomTypes.map(RoomTypeDto::new);
    }

    public RoomType findById(Long id){
        return roomTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Room type with given id not found"));
    }

    public RoomTypeDto get (Long id){
        RoomType roomType = findById(id);
        return new RoomTypeDto(roomType);
    }

    public RoomType create(RoomTypeDto roomTypeDto){
        RoomType roomType = new RoomType();
        roomType.setName(roomTypeDto.getName());
        return roomTypeRepository.save(roomType);
    }

    public void delete(Long id){
        roomTypeRepository.delete(findById(id));
    }
}
