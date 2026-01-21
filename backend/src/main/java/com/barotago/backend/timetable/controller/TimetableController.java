package com.barotago.backend.timetable.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.barotago.backend.timetable.dto.TimetableItemDTO;
import com.barotago.backend.timetable.service.TimetableService;

@RestController
@RequestMapping("/api/stations")
public class TimetableController {
	private final TimetableService timetableService;
	
	public TimetableController(TimetableService timetableService) {
        this.timetableService = timetableService;
    }
	
	@GetMapping("/{stationCd}/timetable")
    public List<TimetableItemDTO> getTimetable(@PathVariable("stationCd") String stationCd, @RequestParam("weekTag") int weekTag) {
        return timetableService.getTimetable(stationCd, weekTag);
    }
}
