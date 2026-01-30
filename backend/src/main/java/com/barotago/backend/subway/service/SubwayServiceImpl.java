package com.barotago.backend.subway.service;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.barotago.backend.subway.dao.SubwayDAO;
import com.barotago.backend.subway.domain.ServiceLine;
import com.barotago.backend.subway.dto.LineStationResponseDTO;
import com.barotago.backend.subway.dto.SubwayArrivalDTO;
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
	
	@Value("${seoul.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public List<SubwayArrivalDTO> getRealtimeArrival(String stationName) {

        List<SubwayArrivalDTO> result = new ArrayList<>();

        try {
            URI uri = UriComponentsBuilder
                    .fromUriString("http://swopenapi.seoul.go.kr/api/subway")
                    .pathSegment(
                            apiKey,
                            "json",
                            "realtimeStationArrival",
                            "0",
                            "10",
                            stationName
                    )
                    .encode(StandardCharsets.UTF_8)
                    .build()
                    .toUri();

            HttpHeaders headers = new HttpHeaders();
            headers.set("User-Agent", "Mozilla/5.0");
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));

            HttpEntity<Void> entity = new HttpEntity<>(headers);

            ResponseEntity<Map> responseEntity =
                    restTemplate.exchange(
                            uri,
                            HttpMethod.GET,
                            entity,
                            Map.class
                    );

            Map response = responseEntity.getBody();

            if (response == null) return result;

            List<Map<String, Object>> arrivalList =
                    (List<Map<String, Object>>) response.get("realtimeArrivalList");

            if (arrivalList == null) return result;

            for (Map<String, Object> item : arrivalList) {
                result.add(new SubwayArrivalDTO(
                        (String) item.get("updnLine"),
                        (String) item.get("trainLineNm"),
                        (String) item.get("arvlMsg2"),
                        (String) item.get("arvlMsg3"),
                        (String) item.get("btrainSttus"),
                        String.valueOf(item.get("barvlDt"))
                ));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
