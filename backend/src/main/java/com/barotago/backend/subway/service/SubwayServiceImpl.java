package com.barotago.backend.subway.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.barotago.backend.subway.dao.SubwayDAO;
import com.barotago.backend.subway.domain.ServiceLine;
import com.barotago.backend.subway.dto.LineStationResponseDTO;
import com.barotago.backend.subway.dto.SubwayChildLineResponseDTO;
import com.barotago.backend.subway.dto.SubwayLineResponseDTO;

@Service
public class SubwayServiceImpl implements SubwayService {
	private final SubwayDAO subwayDAO;
	
	public SubwayServiceImpl(SubwayDAO subwayDAO) {
		this.subwayDAO = subwayDAO;
	}
	
	public List<SubwayLineResponseDTO> getMainLines() {
		
		List<ServiceLine> lines = subwayDAO.selectMainLines();
		
		List<SubwayLineResponseDTO> result = new ArrayList<>();
		for(int i = 0; i < lines.size(); i++) {
			
			ServiceLine line = lines.get(i);
			
			SubwayLineResponseDTO dto = new SubwayLineResponseDTO();
			dto.setLineCode(line.getLineCode());
			dto.setLineName(line.getLineName());
			dto.setColorHex(line.getColorHex());
			dto.setTextColor(line.getTextColor());
			dto.setOrderNo(line.getOrderNo());
			
			result.add(dto);
		}
		
		return result;
	}

	@Override
	public List<SubwayChildLineResponseDTO> getChildLines(String parentCode) {
		
		List<ServiceLine> lines = subwayDAO.selectChildLines(parentCode);
		
		List<SubwayChildLineResponseDTO> result = new ArrayList<>();
		for(int i = 0; i < lines.size(); i++) {
			
			ServiceLine line = lines.get(i);
			
			SubwayChildLineResponseDTO dto = new SubwayChildLineResponseDTO();
			dto.setLineCode(line.getLineCode());
			dto.setLineName(line.getLineName());
			
			result.add(dto);
		}
		
		return result;
	}

	@Override
	public List<LineStationResponseDTO> getStationsByLine(String lineCode) {
		return subwayDAO.findStationByLineCode(lineCode);
	}
	
}
