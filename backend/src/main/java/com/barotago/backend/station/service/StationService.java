package com.barotago.backend.station.service;

import java.util.List;

import com.barotago.backend.station.dto.StationDetailResponseDTO;
import com.barotago.backend.station.dto.StationFacilityResponseDTO;

public interface StationService {
	StationDetailResponseDTO getStationInfo(int stationId);
	List<StationFacilityResponseDTO> getStationFacility(int stationId);
}
