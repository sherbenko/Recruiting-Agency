package com.itechart.agency.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {

    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
        httpServletResponse.sendError(HttpServletResponse.SC_NOT_FOUND, "Unauthorized");
//        httpServletResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
//        httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//
//        final Map<String, Object> body = new HashMap<>();
//        body.put("code", HttpServletResponse.SC_UNAUTHORIZED);
//        body.put("payload", "You need to login first in order to perform this action.");
//
//        final ObjectMapper mapper = new ObjectMapper();
//        mapper.writeValue(httpServletResponse.getOutputStream(), body);

    }
}
