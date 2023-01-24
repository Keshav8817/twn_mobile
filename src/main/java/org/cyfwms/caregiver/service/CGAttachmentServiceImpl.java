package org.cyfwms.caregiver.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.cyfwms.caregiver.dto.CGAttachmentDto;
import org.cyfwms.caregiver.entity.CGAttachmentEntity;
import org.cyfwms.caregiver.repository.CGAttachmentRepository;
import org.cyfwms.common.entity.Attachment;
import org.cyfwms.common.exception.I18Constants;
import org.cyfwms.common.exception.MessageUtil;
import org.cyfwms.common.exception.NoSuchElementFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@Service
public class CGAttachmentServiceImpl implements CGAttachmentService {
    @Autowired
    private CGAttachmentRepository cgAttachmentRepository;

    @Autowired
    private MessageUtil messageUtil;


    @Override
    public CGAttachmentDto saveCGAttachment(MultipartFile file, String cgAttachmentDto) throws IOException {
        Attachment attachment = null;
        CGAttachmentDto cGAttachmentDto = new ObjectMapper().readValue(cgAttachmentDto, CGAttachmentDto.class);
        CGAttachmentEntity cGAttachmentEntity = new CGAttachmentEntity();
        attachment = new Attachment();
        long cgImageId = cGAttachmentDto.getCgImageId();
        if (cGAttachmentDto.getCgImageId() == 0) {
            cGAttachmentEntity.setStatus("ACTIVE");
            BeanUtils.copyProperties(cGAttachmentDto, cGAttachmentEntity);
        } else {
            cGAttachmentEntity = readCareGiverImage(cgImageId);
            cGAttachmentDto.setCgImageId(cGAttachmentDto.getCgImageId());
            if (cGAttachmentEntity.getAttachment() != null) {
                attachment.setAttachmentId(cGAttachmentEntity.getAttachment().getAttachmentId());
                attachment.setReceiptDate(cGAttachmentEntity.getAttachment().getReceiptDate());
            }
            BeanUtils.copyProperties(cGAttachmentDto, cGAttachmentEntity);
        }
        if (file != null) {
            validateCareGiverAttachment(file);
            attachment.setAttachmentContents(file.getBytes());
            attachment.setAttachmentName(file.getOriginalFilename());
            attachment.setAttachmentStatus("ACTIVE");
            attachment.setDocumentType(file.getContentType());
            cGAttachmentEntity.setAttachment(attachment);
        }
        cGAttachmentEntity = cgAttachmentRepository.save(cGAttachmentEntity);
        cGAttachmentDto.setCgImageName(attachment.getAttachmentName());
        cGAttachmentDto.setCgImageType(attachment.getDocumentType());
        cGAttachmentDto.setCgImageFile(attachment.getAttachmentContents());
        cGAttachmentDto.setCgImageId(cGAttachmentEntity.getCgImageId());
        return cGAttachmentDto;
    }

    private void validateCareGiverAttachment(MultipartFile file) {
        boolean invalidCareGiverAttachment = true;

        if (file.getContentType().equals("image/png") ||
                file.getContentType().equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document") ||
                file.getContentType().equals("image/jpg") || file.getContentType().equals("image/jpeg") ||
                file.getContentType().equals("application/pdf") || file.getContentType().equals("application/vnd.ms-excel") ||
                file.getContentType().equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") ||
                file.getContentType().equals("image/bmp") ||
                file.getContentType().equals("image/gif")) {
            invalidCareGiverAttachment = false;
        }
        if (invalidCareGiverAttachment) {
            throw new ResponseStatusException(
                    INTERNAL_SERVER_ERROR, " PNG DOCUMENT JPG PDF SHEET BMP AND GIF content type are allowed");
        }
    }


    @Override
    public CGAttachmentDto getOneFile(Long id) {
        CGAttachmentDto cGAttachmentDto = new CGAttachmentDto();
        CGAttachmentEntity attachmentEntity = readCareGiverImage(id);
        cGAttachmentDto.setCgImageId(attachmentEntity.getCgImageId());
        cGAttachmentDto.setId(attachmentEntity.getId());
        cGAttachmentDto.setType(attachmentEntity.getType());
        cGAttachmentDto.setName(attachmentEntity.getName());
        if (attachmentEntity.getAttachment() != null) {
            cGAttachmentDto.setCgImageType(attachmentEntity.getAttachment().getDocumentType());
            cGAttachmentDto.setCgImageFile(attachmentEntity.getAttachment().getAttachmentContents());
            cGAttachmentDto.setCgImageName(attachmentEntity.getAttachment().getAttachmentName());
        }
        return cGAttachmentDto;
    }

    @Override
    public void removeCGImage(Long cgImageId) {
        CGAttachmentEntity cgAttachmentEntity = readCareGiverImage(cgImageId);
        cgAttachmentEntity.setStatus("INACTIVE");
        cgAttachmentRepository.save(cgAttachmentEntity);
    }

    @Override
    public List<CGAttachmentDto> getAllFiles(Long caregiverProviderId) {
        List<CGAttachmentDto> careGiverImageDtoList = new ArrayList<CGAttachmentDto>();
        careGiverImageDtoList = cgAttachmentRepository.findByCaregiverProviderId(caregiverProviderId)
                .stream()
                .map(attachment -> {
                    CGAttachmentDto attachDto = new CGAttachmentDto();
                    BeanUtils.copyProperties(attachment, attachDto);
                    if (attachment.getAttachment() != null) {
                        attachDto.setCgImageName(attachment.getAttachment().getAttachmentName());
                        attachDto.setCgImageType(attachment.getAttachment().getDocumentType());
                    }
                    return attachDto;
                }).collect(Collectors.toList());
        return careGiverImageDtoList;
    }

    @Override
    public CGAttachmentEntity downloadOne(Long cgImageId) {
        CGAttachmentEntity cGAttachmentEntity=cgAttachmentRepository.findById(cgImageId).
                filter(active->active.getStatus().equalsIgnoreCase("ACTIVE")).orElseThrow(() -> new NoSuchElementFoundException(messageUtil.getLocalMessage(
                        I18Constants.NO_ITEM_FOUND.getKey(), String.valueOf(cgImageId))));
        return cGAttachmentEntity;
    }


    private CGAttachmentEntity readCareGiverImage(long cgImageId) {
        CGAttachmentEntity cGAttachmentEntity = cgAttachmentRepository.findById(cgImageId).filter(p -> p.getStatus().equals("ACTIVE"))
                .orElseThrow(() -> new NoSuchElementFoundException(messageUtil.getLocalMessage(I18Constants.NO_ITEM_FOUND.getKey(), String.valueOf(cgImageId))));

        return cGAttachmentEntity;
    }
}