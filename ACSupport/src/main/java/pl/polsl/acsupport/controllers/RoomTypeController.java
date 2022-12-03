package pl.polsl.acsupport.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.acsupport.services.RoomTypeService;

@RequiredArgsConstructor
@RequestMapping("/roomtype")
@RestController
@Validated
public class RoomTypeController {

    private final RoomTypeService roomTypeService;
}
