package com.barotago.backend.station.service;

import org.springframework.stereotype.Service;

import com.barotago.backend.station.dao.StationDAO;
import com.barotago.backend.station.dto.StationDetailResponseDTO;

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
	
}
