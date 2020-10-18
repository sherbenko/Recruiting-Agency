package com.itechart.agency.service.impl;

import com.itechart.agency.exception.BadRequestException;
import com.itechart.agency.exception.NotFoundException;
//import com.itechart.agency.repository.FileRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Properties;

@Service
public class FileServiceImpl {
    private static final Logger log = Logger.getLogger(FileServiceImpl.class);
    private static final Properties props = new Properties();

    static {
        try {
            props.load(FileServiceImpl.class.getClassLoader().getResourceAsStream("path.properties"));
        } catch (IOException e) {
            log.error(e);
        }
    }

   /* private final FileRepository fileRepository;

    @Autowired
    public FileServiceImpl(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }
*/
//file- response output stream
    public void downloadFile(Long id, String file) {
        try {
            if (id <= 0L) throw new BadRequestException("Not valid id");
           /* if(fileRepository.findById(id).isEmpty())
                throw new NotFoundException("File not found");
            String fileName = fileRepository.findById(id).get().getFile_path();*/
            String fileName = "1.docx";
            String fullPath = props.getProperty("file.path") + fileName;
            OutputStream out = new FileOutputStream(file);
            FileInputStream in = new FileInputStream(fullPath);
            byte[] buffer = new byte[4096];
            int length;

            while ((length = in.read(buffer)) > -1) {
                out.write(buffer, 0, length);
            }
            in.close();
            out.flush();
        } catch (Exception e) {
            log.error(e);
        }
    }
}
