package com.barotago.backend.subway.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barotago.backend.subway.dao.SubwayDAO;
import com.barotago.backend.subway.domain.ServiceLine;

@RestController
@RequestMapping("/api/subway")
public class SubwayController {
	private final SubwayDAO subwayDAO;

    public SubwayController(SubwayDAO subwayDAO) {
        this.subwayDAO = subwayDAO;
    }

    @GetMapping("/lines")
    public List<ServiceLine> test() {
        return subwayDAO.selectMainLines();
    }
}
