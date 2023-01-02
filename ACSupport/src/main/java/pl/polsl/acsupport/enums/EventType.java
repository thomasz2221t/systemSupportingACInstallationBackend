package pl.polsl.acsupport.enums;

public enum EventType {
    NEW_MESSAGE("Masz nową wiadomość w chatcie"),

    NEW_SERVICE("Masz nowe zamówienie na usługę"),

    NEW_OFFER("Otrzymałeś nową ofertę");

    public final String label;

    private EventType(String label) {
        this.label = label;
    }
}

