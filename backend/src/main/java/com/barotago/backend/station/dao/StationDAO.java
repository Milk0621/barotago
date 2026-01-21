package com.barotago.backend.station.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.barotago.backend.station.dto.StationDetailResponseDTO;
import com.barotago.backend.station.dto.StationFacilityResponseDTO;

public interface StationDAO {
	StationDetailResponseDTO findStationDetailById(@Param("stationId") int stationId);
	List<StationFacilityResponseDTO> findFacilitiesByStationId(@Param("stationId") int stationId); 
}
