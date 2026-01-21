package com.barotago.backend.station.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.barotago.backend.station.dao.StationDAO;
import com.barotago.backend.station.dto.StationDetailResponseDTO;
import com.barotago.backend.station.dto.StationFacilityResponseDTO;

@Service
public class StationServiceImpl implements StationService {

	private final StationDAO stationDAO;
	public StationServiceImpl(StationDAO stationDAO) {
		this.stationDAO = stationDAO;
	}
	
	@Override
	public StationDetailResponseDTO getStationInfo(int StationId) {
		return stationDAO.findStationDetailById(StationId);
	}

	@Override
	public List<StationFacilityResponseDTO> getStationFacility(int stationId) {
		return stationDAO.findFacilitiesByStationId(stationId);
	}
	
}
