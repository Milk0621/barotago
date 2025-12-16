package com.barotago.backend.subway.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.barotago.backend.subway.dao.SubwayDAO;
import com.barotago.backend.subway.domain.ServiceLine;

@Service
public class SubwayServiceImp {
	private final SubwayDAO subwayDAO;
	
	public SubwayServiceImp(SubwayDAO subwayDAO) {
		this.subwayDAO = subwayDAO;
	}
	
	public List<ServiceLine> getMainLines() {
		return subwayDAO.selectMainLines();
	}
}
