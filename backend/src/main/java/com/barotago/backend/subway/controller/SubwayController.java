package com.barotago.backend.subway.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barotago.backend.subway.dto.SubwayChildLineResponseDTO;
import com.barotago.backend.subway.dto.SubwayLineResponseDTO;
import com.barotago.backend.subway.service.SubwayService;

@RestController
@RequestMapping("/api/subway")
public class SubwayController {
	private final SubwayService subwayService;

    public SubwayController(SubwayService subwayService) {
        this.subwayService = subwayService;
    }

    @GetMapping("/lines")
    public List<SubwayLineResponseDTO> getMainLines() {
        return subwayService.getMainLines();
    }
    
    @GetMapping("/lines/{lineCode}/children")
    public List<SubwayChildLineResponseDTO> getChildLines(@PathVariable("lineCode") String parentCode) {
    	return subwayService.getChildLines(parentCode);
    }
}
