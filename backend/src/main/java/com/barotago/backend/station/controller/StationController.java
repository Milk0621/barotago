package com.barotago.backend.station.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barotago.backend.station.dto.StationDetailResponseDTO;
import com.barotago.backend.station.dto.StationFacilityResponseDTO;
import com.barotago.backend.station.service.StationService;

@RestController
@RequestMapping("/api/stations")
public class StationController {
	private final StationService stationService;
	public StationController(StationService stationService) {
		this.stationService = stationService;
	}
	
	@GetMapping("/{stationId}")
	public StationDetailResponseDTO getStationInfo(@PathVariable("stationId") int stationId) {
		return stationService.getStationInfo(stationId);
	}
	
	@GetMapping("/{stationId}/facilities")
	public List<StationFacilityResponseDTO> getStationFacility(@PathVariable("stationId") int stationId) {
		return stationService.getStationFacility(stationId);
	}
}
