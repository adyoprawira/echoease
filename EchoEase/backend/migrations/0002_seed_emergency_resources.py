from django.db import migrations


RESOURCES = [
    {
        "name": "Triple Zero",
        "phone_number": "000",
        "description": "Call for immediate danger or urgent police, fire, or ambulance help.",
        "category": "emergency",
        "source_url": "https://www.triplezero.gov.au/triple-zero/How-to-Call-000",
    },
    {
        "name": "Lifeline",
        "phone_number": "13 11 14",
        "description": "24/7 crisis support in Australia.",
        "category": "crisis",
        "source_url": "https://www.lifeline.org.au/get-help/national-services/lifeline-crisis-support",
    },
    {
        "name": "UQ Counselling and Crisis Line",
        "phone_number": "1300 851 998",
        "description": "Urgent UQ mental health support, available 24/7.",
        "category": "university",
        "source_url": "https://my.uq.edu.au/information-and-services/student-support/health-and-wellbeing/health-and-wellbeing-overview/self-help-resources/exam-anxiety",
    },
]


def seed_resources(apps, schema_editor):
    EmergencyResource = apps.get_model("backend", "EmergencyResource")
    for resource in RESOURCES:
        EmergencyResource.objects.update_or_create(
            phone_number=resource["phone_number"],
            defaults=resource,
        )


def remove_seed_resources(apps, schema_editor):
    EmergencyResource = apps.get_model("backend", "EmergencyResource")
    EmergencyResource.objects.filter(
        phone_number__in=[resource["phone_number"] for resource in RESOURCES]
    ).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("backend", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_resources, remove_seed_resources),
    ]
