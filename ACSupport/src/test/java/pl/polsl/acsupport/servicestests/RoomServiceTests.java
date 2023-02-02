package pl.polsl.acsupport.servicestests;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import pl.polsl.acsupport.entities.Room;
import pl.polsl.acsupport.entities.RoomType;
import pl.polsl.acsupport.repositories.RoomRepository;
import pl.polsl.acsupport.repositories.RoomTypeRepository;
import pl.polsl.acsupport.services.RoomService;
import pl.polsl.acsupport.services.RoomTypeService;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class RoomServiceTests {

    @InjectMocks
    private RoomService roomService;

    @Mock
    private RoomRepository roomRepository;

    @Mock
    private RoomTypeService roomTypeService;

    @Mock
    private RoomTypeRepository roomTypeRepository;

    private Room room1 = new Room();

    private RoomType roomType1 = new RoomType();

    @Before
    public void setUp(){
        room1.setName("Pomieszczenie usługowe pierkania");
        room1.setAreaWidth(BigDecimal.valueOf(20));
        room1.setAreaHeight(BigDecimal.valueOf(30));
        room1.setHeight(BigDecimal.valueOf(3));
        room1.setEnergyGivenOut(BigDecimal.valueOf(0));
        room1.setPeopleNumber(BigDecimal.valueOf(2));
        room1.setDescription("Pomieszczenie usługowe");

        roomType1.setName("Pomieszczenie Mieszkalne");

        room1.setType(roomType1);
        Set<Room> roomsSet = new LinkedHashSet<>();
        roomsSet.add(room1);
        roomType1.setRooms(roomsSet);
    }

    @Test
    public void assignTypeToRoom_WhenGivenRoomIdAndTypeId_ThenShouldExecuteRepositorySaveMethodTwice(){
        //given
        when(roomRepository.findById(room1.getId()))
                .thenReturn(Optional.of(room1));
        when(roomTypeService.findById(roomType1.getId()))
                .thenReturn(roomType1);

        //when
        roomService.assignTypeToRoom(room1.getId(), roomType1.getId());

        //then
        verify(roomTypeRepository, times(1)).save(any(RoomType.class));
        verify(roomRepository, times(1)).save(any(Room.class));
    }

    @Test
    public void revertAssigningTypeFromRoom_WhenGivenRoomId_ThenShouldExecuteRepositorySaveMethodTwice(){
        //given
        when(roomRepository.findById(room1.getId()))
                .thenReturn(Optional.of(room1));

        //when
        roomService.revertAssigningTypeFromRoom(room1.getId());

        //then
        verify(roomTypeRepository, times(1)).save(any(RoomType.class));
        verify(roomRepository, times(1)).save(any(Room.class));
    }
}
