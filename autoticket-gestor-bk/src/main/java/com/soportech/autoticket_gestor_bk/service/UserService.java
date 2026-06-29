package com.soportech.autoticket_gestor_bk.service;

import com.soportech.autoticket_gestor_bk.dto.WhatsappWebhookRequest;
import com.soportech.autoticket_gestor_bk.model.User;
import com.soportech.autoticket_gestor_bk.model.enums.InstitutionalRole;
import com.soportech.autoticket_gestor_bk.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User searchOrCreateByWhatsapp(WhatsappWebhookRequest request) {
        Optional<User> exist = userRepository.findByWhatsappNumber(request.getWhatsappNumber());

        if (exist.isPresent()) {
            return exist.get();
        }

        User user = new User();
        user.setIdInstitutional(request.getInstitutionalID());
        user.setFullName(request.getFullName());
        user.setInstitutionalEmail(request.getInstitutionalEmail());
        user.setWhatsappNumber(request.getWhatsappNumber());
        user.setInstitutionalRole(InstitutionalRole.valueOf(request.getInstitutionalRole()));
        user.setProgramOrArea(request.getProgramOrArea());

        return userRepository.save(user);
    }

    public Optional<User> findByWhatsappNumber(String whatsappNumber) {
        return userRepository.findByWhatsappNumber(whatsappNumber);
    }

}
