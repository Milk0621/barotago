package com.barotago.backend.station.dao;

import java.util.List;

import com.barotago.backend.station.dto.StationDetailResponseDTO;
import com.barotago.backend.station.dto.StationFacilityResponseDTO;

public interface StationDAO {
	StationDetailResponseDTO findStationDetailById(int stationId);
	List<StationFacilityResponseDTO> findFacilitiesByStationId(int stationId); 
}
