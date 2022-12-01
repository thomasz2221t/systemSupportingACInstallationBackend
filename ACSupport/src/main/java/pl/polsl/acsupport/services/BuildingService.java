package pl.polsl.acsupport.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.acsupport.dtos.BuildingDto;
import pl.polsl.acsupport.entities.Building;
import pl.polsl.acsupport.entities.Room;
import pl.polsl.acsupport.entities.User;
import pl.polsl.acsupport.repositories.BuildingRepository;
import pl.polsl.acsupport.repositories.RoomRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class BuildingService {

    final private BuildingRepository buildingRepository;

    final private UserService userService;

    final private RoomService roomService;

    final private RoomRepository roomRepository;

    public Page<BuildingDto> findAll(Pageable pageable){
        final Page<Building> buildings = buildingRepository.findAll(pageable);
        return buildings.map(BuildingDto::new);
    }

    public Building findById(Long id){
        return buildingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Building with given id not found"));
    }
    public BuildingDto get(Long id){
        final Building building = findById(id);
        return new BuildingDto(building);
    }

    @Transactional
    public Building create(BuildingDto buildingDto){
        Building building = new Building();
        return setDataFromDto(buildingDto, building);
    }

    @Transactional
    public Building update(Long id, BuildingDto buildingDto){
        Building building = findById(id);
        return setDataFromDto(buildingDto, building);
    }

    private Building setDataFromDto(BuildingDto buildingDto, Building building) {
        building.setName(buildingDto.getName());
        building.setImagePath(buildingDto.getImagePath());
        building.setStreet(buildingDto.getStreet());
        building.setPostCode(buildingDto.getPostCode());
        building.setCity(buildingDto.getCity());
        building.setRegion(buildingDto.getRegion());
        building.setDescription(buildingDto.getDescription());
        return buildingRepository.save(building);
    }

    @Transactional
    public void delete(Long id){
        buildingRepository.delete(findById(id));
    }

    public Page<BuildingDto>findUserBuildings(Long userId){
        User user = userService.findById(userId);
        Set<Building> buildings = user.getBuildings();
        List<BuildingDto> buildingDtos = buildings.stream().map(BuildingDto::new).collect(Collectors.toList());
        return new PageImpl<>(buildingDtos);
    }

    @Transactional
    public void assignRoomToBuilding(Long buildingId, Long roomId){
        Building building = findById(buildingId);
        Room room = roomService.findById(roomId);

        Set<Room> buildingRoom = building.getRooms();
        buildingRoom.add(room);
        building.setRooms(buildingRoom);

        room.setBuilding(building);

        buildingRepository.save(building);
        roomRepository.save(room);
    }
}
