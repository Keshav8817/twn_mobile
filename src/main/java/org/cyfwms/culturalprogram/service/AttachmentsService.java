package org.cyfwms.culturalprogram.service;

import org.cyfwms.culturalprogram.dto.AttachmentDTO;
import org.cyfwms.culturalprogram.entity.AttachmentEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AttachmentsService {
    AttachmentDTO uploadImage(MultipartFile file, String culturalDto) throws IOException;

    AttachmentDTO getOneFile(Long id);

    void removeCulturalProgImage(Long culturalProgImageId);

    List<AttachmentDTO> getAllFiles(Long culturalProgramId);

    AttachmentEntity downloadOne(Long culturalProgImageId);
}
