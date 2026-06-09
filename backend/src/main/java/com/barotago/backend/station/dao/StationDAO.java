package com.barotago.backend.station.dao;

import com.barotago.backend.station.dto.StationDetailResponseDTO;
import com.barotago.backend.station.dto.StationFacilityResponseDTO;

import java.util.List;

public interface StationDAO {
	StationDetailResponseDTO findStationDetailById(int stationId);
	List<StationFacilityResponseDTO> findFacilitiesByStationId(int stationId);
}
