import React from "react";

export default function Map() {
  return (
    <div className="lg:col-span-1">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.602267507604!2d106.66621797570379!3d10.841718757984644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529aeecedb079%3A0x255246387c6277fc!2zNTQgSOG6u20gMjA4IMSQLiBT4buRIDksIEtEQyBDaXR5bGFuZCBQYXJrIEhpbGxzLCBHw7IgVuG6pXAsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1725441211065!5m2!1svi!2s"
        className="h-[250px] w-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
