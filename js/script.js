// Printway website interactions

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 80);
    }
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        const isCurrent = link.getAttribute('href') === `#${current}`;
        link.classList.toggle('active', isCurrent);
    });
});

const revealElements = document.querySelectorAll(
    '.section-title, .overview-card, .about-image, .about-text, .mv-card, .policy-wide, .why-card, .machine-card, .machine-product-card, .ink-card, .brand-card, .contact-info, .contact-form, .map-container'
);

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.88;

    revealElements.forEach((element) => {
        if (element.getBoundingClientRect().top < triggerBottom) {
            element.classList.add('show');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

const inquiryForm = document.querySelector('#inquiry-form');

if (inquiryForm) {
    inquiryForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!inquiryForm.checkValidity()) {
            inquiryForm.reportValidity();
            return;
        }

        const name = document.querySelector('#inquiry-name').value.trim();
        const email = document.querySelector('#inquiry-email').value.trim();
        const company = document.querySelector('#inquiry-company').value.trim() || 'Not provided';
const message = document.querySelector('#inquiry-message').value.trim();
        const status = document.querySelector('#form-status');
        const subject = encodeURIComponent(`Website inquiry from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nInquiry:\n${message}`);

        status.innerHTML = 'Opening your email app with your inquiry filled in.<br>If it does not open, please email us directly at <a href="mailto:sales1@printway.net">sales1@printway.net</a> or <a href="mailto:jovel@printway.net">jovel@printway.net</a>.';

        const mailLink = document.createElement('a');
        mailLink.href = `mailto:sales1@printway.net,jovel@printway.net?subject=${subject}&body=${body}`;
        mailLink.style.display = 'none';
        document.body.appendChild(mailLink);
        mailLink.click();
        mailLink.remove();
    });
}

const quotedModel = new URLSearchParams(window.location.search).get('model');

if (inquiryForm && quotedModel) {
    const messageField = document.querySelector('#inquiry-message');

    if (messageField && !messageField.value.trim()) {
        messageField.value = 'I would like a quote for ' + quotedModel + '.';
    }
}

/* ==========================================
   MACHINE FAMILY TILE ROWS (ARROW-KEY BROWSING)
========================================== */

document.querySelectorAll('.family-tile-row').forEach(function (row) {
    row.setAttribute('tabindex', '0');

    row.addEventListener('keydown', function (event) {

        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') { return; }

        event.preventDefault();

        const tile = row.querySelector('.family-tile');

        if (!tile) { return; }

        const step = tile.offsetWidth + 24;

        if (event.key === 'ArrowLeft') {
            row.scrollLeft -= step;
        } else {
            row.scrollLeft += step;
        }

    });
});

/* ==========================================
   PAD PRINTING CATALOGUE AND DETAIL PAGES
========================================== */

(function () {
    const definitions = [
        ['WN-121', 'wn-121.html', 'wn-121', 'Open inkwell', 'Compact format', 'Small components and repeat logo marking', 'Compact one-color printer for product identifiers and small parts.'],
        ['WN-121A', 'wn-121A.html', 'wn-121A', 'Open inkwell', 'Compact format', 'Small parts and repeat production', 'Compact production model for repeat graphics on small parts and promotional items.'],
        ['WN-121X', 'wn-121X.html', 'wn-121X', 'Open inkwell', 'Extended format', 'Extended graphics on compact products', 'Extended-format compact model for larger graphics on small workpieces.'],
        ['WN-121AE', 'wn-121AE.html', 'wn-121AE', 'Sealed ink cup', 'Compact format', 'Controlled printing on small components', 'Compact sealed-cup model for clean, controlled repeat printing.'],
        ['WN-121XE', 'wn-121XE.html', 'wn-121XE', 'Sealed ink cup', 'Extended format', 'Extended graphics with contained ink handling', 'Extended-format sealed-cup model for clean, accurate product marking.'],
        ['WN-122', 'wn-122.html', 'wn-122', 'Open inkwell', 'Standard format', 'General industrial product marking', 'Standard open-inkwell printer for dependable industrial product marking.'],
        ['WN-122A', 'wn-122A.html', 'wn-122A', 'Open inkwell', 'Wide format', 'Broader graphics on production parts', 'Wide-format open-inkwell model for production parts requiring broader graphics.'],
        ['WN-122X', 'wn-122X.html', 'wn-122X', 'Open inkwell', 'Extended format', 'Extended one-color logos and markings', 'Extended-format model for larger one-color logos, panels, and markings.'],
        ['WN-122E', 'wn-122E.html', 'wn-122E', 'Sealed ink cup', 'Standard format', 'Clean, repeatable general production', 'Standard sealed-cup model for clean, repeatable one-color printing.', 'technical-drawing.png'],
        ['WN-122AE', 'wn-122AE.html', 'wn-122AE', 'Sealed ink cup', 'Standard format', 'Controlled print quality on production components', 'Standard sealed-cup configuration for controlled production printing.'],
        ['WN-122AECG', 'wn-122AECG.html', 'wn-122AECG', 'Sealed ink cup', 'Standard format', 'Repeatable, controlled one-color marking', 'Sealed-cup production configuration for controlled repeat marking.'],
        ['WN-122AFE', 'wn-122AFE.html', 'wn-122AFE', 'Sealed ink cup', 'Long format', 'Long one-color graphics and product identifiers', 'Long-format sealed-cup model for extended logos and product identifiers.'],
        ['WN-122AXE', 'wn-122AXE.html', 'wn-122AXE', 'Sealed ink cup', 'Extended format', 'Extended-format production graphics', 'Extended-format sealed-cup model for larger one-color production graphics.'],
        ['WN-122FE', 'wn-122FE.html', 'wn-122FE', 'Sealed ink cup', 'Transverse long format', 'Long, horizontal print layouts', 'Transverse long-format sealed-cup model for extended horizontal layouts.'],
        ['WN-122XE', 'wn-122XE.html', 'wn-122XE', 'Sealed ink cup', 'Extended format', 'Extended graphics with contained ink handling', 'Extended-format sealed-cup model for accurate, contained production printing.'],
        ['WN-126', 'wn-126.html', 'wn-126', 'Open inkwell', 'Large format', 'Larger components and wider product markings', 'Large-format open-inkwell printer for larger components and graphics.'],
        ['WN-126X', 'wn-126X.html', 'wn-126X', 'Open inkwell', 'Extended large format', 'Extended markings on larger products', 'Extended large-format open-inkwell model for wider product graphics.'],
        ['WN-126E', 'wn-126E.html', 'wn-126E', 'Sealed ink cup', 'Large format', 'Large-format controlled production printing', 'Large-format sealed-cup model for clean, controlled production marking.'],
        ['WN-126EC', 'wn-126EC.html', 'wn-126EC', 'Sealed ink cup', 'Large format', 'Repeat one-color product identification', 'Large sealed-cup configuration for repeat product-identification printing.'],
        ['WN-126EG', 'wn-126EG.html', 'wn-126EG', 'Sealed ink cup', 'Large format', 'Controlled large-component graphics', 'Large sealed-cup configuration for clean graphics on larger components.'],
        ['WN-126XE', 'wn-126XE.html', 'wn-126XE', 'Sealed ink cup', 'Extended large format', 'Extended graphics on larger components', 'Extended large-format sealed-cup model for controlled production graphics.'],
        ['WN-135', 'wn-135.html', 'wn-135', 'Open inkwell', 'Long format', 'Long graphics and extended product marks', 'Long-format open-inkwell printer for extended logos and product markings.'],
        ['WN-135B', 'wn-135B.html', 'wn-135B', 'Open inkwell', 'Long format', 'Long-format production graphics', 'Long-format open-inkwell model for extended production graphics.'],
        ['WN-135E', 'wn-135E.html', 'wn-135E', 'Sealed ink cup', 'Long format', 'Long graphics with controlled ink handling', 'Long-format sealed-cup model for clean, controlled extended graphics.'],
        ['WN-135FE', 'wn-135FE.html', 'wn-135FE', 'Sealed ink cup', 'Transverse long format', 'Long, horizontal production layouts', 'Transverse long-format sealed-cup model for extended horizontal layouts.'],
        ['WN-160A', 'wn-160A.html', 'wn-160A', 'Open inkwell', 'Large format', 'Large components and industrial marking', 'Large open-inkwell printer for demanding industrial product marking.'],
        ['WN-160AE', 'wn-160AE.html', 'wn-160AE', 'Sealed ink cup', 'Large format', 'Large-format controlled production work', 'Large sealed-cup model for controlled production printing on larger parts.'],
        ['WN-161E', 'wn-161E.html', 'wn-161E', 'Sealed ink cup', 'Large format', 'Floor-standing large-component production', 'Floor-standing sealed-cup model for controlled large-component marking.'],
        ['WNS-250EC', 'wns-250EC.html', 'wns-250EC', 'Sealed ink cup', 'Precision format', 'High-precision, repeatable production marking', 'Servo-driven sealed-cup model for precise, repeatable production printing.']
    ];

    const models = definitions.map(function (item) {
        return {
            id: item[0],
            file: item[1],
            asset: item[2],
            ink: item[3],
            format: item[4],
            focus: item[5],
            catalog: item[6],
            drawing: item[7] || 'technical-drawing.jpg',
            servo: item[0] === 'WNS-250EC'
        };
    });

    const escapeHtml = function (value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character];
        });
    };

    const imageBase = function (model) {
        return '../images/machines/pad-printing/' + model.asset + '/';
    };

    const feature = function (icon, title, text) {
        return '<div class="feature-box"><div class="feature-icon"><i class="fa-solid ' + icon + '" aria-hidden="true"></i></div><div><h3>' + escapeHtml(title) + '</h3><p>' + escapeHtml(text) + '</p></div></div>';
    };

    const formatFeature = function (model) {
        if (model.format.indexOf('Transverse') !== -1) {
            return ['fa-arrows-left-right', 'Long-layout capability', 'Suited to longer, horizontal graphics and product-identification layouts.'];
        }
        if (model.format.indexOf('Long') !== -1) {
            return ['fa-arrows-left-right', 'Long-format capability', 'Suited to products that need longer one-color graphics or identifiers.'];
        }
        if (/(Extended|Large|Wide)/.test(model.format)) {
            return ['fa-expand', 'Extended graphic format', 'A strong option when the product calls for a broader one-color print area.'];
        }
        return ['fa-crosshairs', 'Compact precision', 'Well suited to clear, repeatable logos, symbols, and product markings.'];
    };

    const applications = function () {
        const items = [
            ['fa-cube', 'Plastic Components', 'Housings, covers, buttons, switches, and molded plastic parts.'],
            ['fa-microchip', 'Electronic Products', 'Control panels, remote controls, keyboards, and accessories.'],
            ['fa-bottle-droplet', 'Packaging & Containers', 'Bottles, caps, containers, and branded packaging components.'],
            ['fa-gift', 'Promotional Items', 'Pens, keychains, USB drives, and other customised items.'],
            ['fa-car', 'Automotive Parts', 'Knobs, switches, trim pieces, and interior components.'],
            ['fa-gears', 'Industrial Components', 'Parts that require logos, symbols, codes, or identification markings.']
        ];

        return items.map(function (item) {
            return '<div class="product-card"><div class="product-icon"><i class="fa-solid ' + item[0] + '" aria-hidden="true"></i></div><h3>' + item[1] + '</h3><p>' + item[2] + '</p></div>';
        }).join('');
    };

    const catalogueCards = function (items) {
        return items.map(function (model) {
            return '<article class="machine-product-card"><img src="' + imageBase(model) + 'main-photo.jpg" alt="Winon ' + escapeHtml(model.id) + ' pad printing machine"><div class="machine-product-content"><span>' + escapeHtml(model.ink) + '</span><h2>' + escapeHtml(model.id) + '</h2><p>' + escapeHtml(model.catalog) + '</p><a href="' + model.file + '" class="machine-btn">View details <i class="fas fa-arrow-right" aria-hidden="true"></i></a></div></article>';
        }).join('');
    };

    const renderCatalogue = function () {
        const inkwellGrid = document.getElementById('single-color-inkwell-grid');
        const inkCupGrid = document.getElementById('single-color-inkcup-grid');

        if (inkwellGrid || inkCupGrid) {
            if (inkwellGrid) {
                inkwellGrid.innerHTML = catalogueCards(models.filter(function (model) {
                    return model.ink === 'Open inkwell';
                }));
            }
            if (inkCupGrid) {
                inkCupGrid.innerHTML = catalogueCards(models.filter(function (model) {
                    return model.ink === 'Sealed ink cup';
                }));
            }
            return;
        }

        const grid = document.getElementById('pad-printing-grid');
        if (grid) {
            grid.innerHTML = catalogueCards(models);
        }
    };

    const renderDetail = function (model) {
        const main = document.querySelector('main');
        if (!main) {
            return;
        }

        const name = 'Winon ' + model.id;
        const base = imageBase(model);
        const type = model.servo ? 'Servo single-color ink-cup pad printing machine' : 'Automatic single-color ' + (model.ink === 'Sealed ink cup' ? 'ink-cup' : 'open-inkwell') + ' pad printing machine';
        const drive = model.servo ? 'Servo-controlled production cycle' : 'Pneumatic production cycle';
        const quote = '../index.html?model=' + encodeURIComponent(name) + '#contact';
        const inkFeature = model.ink === 'Sealed ink cup'
            ? ['fa-droplet', 'Sealed ink-cup system', 'Helps contain ink and solvent during routine production work.']
            : ['fa-palette', 'Open inkwell system', 'Provides direct access for ink and doctor-blade setup during production.'];
        const sizeFeature = formatFeature(model);

        document.title = name + ' | ' + type + ' | Printway';
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', name + ' ' + type.toLowerCase() + ' from Printway Marketing & Services.');
        }

        main.innerHTML =
            '<section class="machine-hero" aria-labelledby="machine-title">' +
                '<div class="machine-main-photo"><img src="' + base + 'main-photo.jpg" alt="' + escapeHtml(name) + ' pad printing machine"></div>' +
                '<div class="machine-information"><p class="machine-eyebrow">PAD PRINTING MACHINE</p><h1 id="machine-title">' + escapeHtml(name) + '</h1><h2>' + escapeHtml(type) + '</h2><p class="machine-brand">Winon Industrial Co., Ltd. &mdash; Hong Kong</p><p>' + escapeHtml(model.catalog) + '</p><p>Suitable applications and final tooling should be confirmed with a sample product, ink, pad, plate, and fixture selection.</p><h3>Key Details</h3><table class="machine-spec-table"><tbody>' +
                    '<tr><th scope="row">Model</th><td>' + escapeHtml(model.id) + '</td></tr><tr><th scope="row">Printing Colors</th><td>1 Color</td></tr><tr><th scope="row">Ink System</th><td>' + escapeHtml(model.ink) + '</td></tr><tr><th scope="row">Print Format</th><td>' + escapeHtml(model.format) + '</td></tr><tr><th scope="row">Production System</th><td>' + escapeHtml(drive) + '</td></tr><tr><th scope="row">Product Focus</th><td>' + escapeHtml(model.focus) + '</td></tr>' +
                    '</tbody></table><p class="machine-spec-note">Contact Printway for the full technical specification, available options, and a production suitability review.</p></div></section>' +
            '<section class="machine-feature-section" aria-labelledby="features-title"><div class="feature-image"><img src="' + base + 'close-up.jpg" alt="Close-up of ' + escapeHtml(name) + ' pad printing machine"></div><div class="feature-content"><p class="machine-eyebrow">BUILT FOR PRODUCTION</p><h2 id="features-title">Production Features</h2><div class="feature-list">' +
                feature(inkFeature[0], inkFeature[1], inkFeature[2]) +
                feature(sizeFeature[0], sizeFeature[1], sizeFeature[2]) +
                feature('fa-gears', drive, 'Designed for repeatable pad and plate movement through the print cycle.') +
                feature('fa-screwdriver-wrench', 'Configurable setup', 'Pads, plates, fixtures, inks, and surface preparation are selected for the product and finish.') +
            '</div></div></section>' +
            '<section class="printable-products" aria-labelledby="products-title"><div class="section-header"><h2 id="products-title">Typical Applications</h2><p>The ' + escapeHtml(name) + ' can be specified for a broad range of products. Print results depend on the surface, ink system, artwork, and production setup.</p></div><div class="products-grid">' + applications() + '</div></section>' +
            '<section class="machine-drawing" aria-labelledby="drawing-title"><div class="section-header"><h2 id="drawing-title">Technical Drawing</h2><p>Use the drawing as an installation and layout reference. Confirm final space, utilities, and production requirements with Printway before installation.</p></div><div class="drawing-container"><img src="' + base + model.drawing + '" alt="Technical drawing of ' + escapeHtml(name) + ' pad printing machine"></div><div class="drawing-info"><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i></div><h3>Machine Dimensions</h3><p>Reference the drawing when planning the machine footprint and work area.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-industry" aria-hidden="true"></i></div><h3>Production Layout</h3><p>Plan the operator position, fixture access, and surrounding production flow.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i></div><h3>Installation Review</h3><p>Confirm electrical, compressed-air, tooling, and safety requirements before installation.</p></div></div></section>' +
            '<section class="machine-contact-box" aria-labelledby="contact-title"><h2 id="contact-title">Interested in the ' + escapeHtml(name) + '?</h2><p>Contact Printway Marketing &amp; Services for pricing, machine configuration, product testing, spare parts, consumables, and technical support.</p><a href="' + quote + '" class="quote-button">Request a Quote</a></section>';

        const floatingQuote = document.querySelector('.quote-floating');
        if (floatingQuote) {
            floatingQuote.href = quote;
        }
    };

    const currentFile = window.location.pathname.split('/').pop().toLowerCase();
    const currentModel = models.find(function (model) {
        return model.file.toLowerCase() === currentFile;
    });

    if (currentModel) {
        renderDetail(currentModel);
    } else {
        renderCatalogue();
    }
}());

/* ==========================================
   SPECIAL PAD PRINT AND AUTOMATION CATALOGUES
========================================== */

(function () {
    const standardApplications = [
        ['fa-microchip', 'Electronic Products', 'Keypads, controls, panels, and other electronic components.'],
        ['fa-cube', 'Plastic Components', 'Molded housings, covers, buttons, switches, and consumer-product parts.'],
        ['fa-screwdriver-wrench', 'Hardware & Industrial Parts', 'Hardware accessories and industrial parts that need product markings.']
    ];

    const definitions = [
        {
            id: 'WN-120',
            file: 'wn-120.html',
            asset: 'wn-120',
            category: 'Special Pad Print',
            type: 'Manual single-color open-inkwell pad printing machine',
            catalog: 'Manual open-inkwell printer for compact, flexible product marking.',
            description: 'Winon describes the WN-120 as a manual oil-pan printer with a single-color inkwell system, adjustable setup, and stable operation.',
            specs: [['Single cycle', 'Yes'], ['Maximum print height', '40 mm'], ['Printing speed', 'Manual'], ['Cliché size', '75 × 100 mm'], ['Printing area', '50 × 60 mm'], ['Controller', 'Touch screen'], ['Power supply', '110 V or 220 V, 50/60 Hz'], ['Electric / air requirement', '20 W / 6 bar'], ['External dimensions', '460 × 380 × 540 mm']],
            features: [['fa-keyboard', 'PIC control', 'Microelectronic keyboard operation controller.'], ['fa-sliders', 'Adjustable print setup', 'Independent pad stroke and speed adjustment, with an X/Y/Z and angle-adjustable worktable.'], ['fa-hand-pointer', 'Manual operation', 'A manual oil-pan configuration for flexible setup and product marking.']],
            applications: standardApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WN-120E',
            file: 'wn-120E.html',
            asset: 'wn-120E',
            category: 'Special Pad Print',
            type: 'Manual single-color sealed ink-cup pad printing machine',
            catalog: 'Manual sealed ink-cup printer for clean, economical one-color marking.',
            description: 'Winon lists the WN-120E as a manual single-color ink-cup machine with adjustable pad movement and a flexible worktable.',
            specs: [['Single cycle', 'Yes'], ['Ink cup', 'Ø60 mm'], ['Maximum print height', '40 mm'], ['Printing speed', 'Manual'], ['Cliché size', '75 × 100 mm'], ['Printing area', 'Ø50 mm'], ['Controller', 'Touch screen'], ['Power supply', '110 V or 220 V, 50/60 Hz'], ['Electric / air requirement', '20 W / 6 bar'], ['External dimensions', '460 × 380 × 540 mm']],
            features: [['fa-droplet', 'Ink-saving ink cup', 'The sealed cup helps reduce ink waste and solvent evaporation during manual work.'], ['fa-sliders', 'Adjustable print setup', 'Independent pad stroke and speed adjustment, with an X/Y/Z and angle-adjustable worktable.'], ['fa-hand-pointer', 'Manual operation', 'A compact, manually operated configuration for repeat product marking.']],
            applications: standardApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WN-177E',
            file: 'wn-177E.html',
            asset: 'wn-177E',
            category: 'Special Pad Print',
            type: 'Manual single-color sealed ink-cup pad printing machine',
            catalog: 'Manual ink-cup machine for flexible, repeatable product graphics and marking.',
            description: 'Winon describes the WN-177E as a single-color manual printer with a controlled operating interface, adjustable pad motion, and an X/Y/Z/angle-adjustable worktable.',
            specs: [['Single cycle', 'Yes'], ['Ink cup', 'Ø60 mm'], ['Printing speed', 'Manual'], ['Cliché size', '75 × 150 mm'], ['Printing area', 'Ø50 mm'], ['Controller', 'Touch screen'], ['Power supply', '110 V or 220 V, 50/60 Hz'], ['Electric / air requirement', '20 W / 6 bar'], ['External dimensions', '150 × 310 × 460 mm']],
            features: [['fa-keyboard', 'Microelectronic control', 'Keyboard control interface for the printing cycle.'], ['fa-sliders', 'Adjustable pad motion', 'Separate pad up/down stroke and speed adjustment.'], ['fa-up-down-left-right', 'Flexible worktable', 'X/Y/Z and angle adjustment for product positioning.']],
            applications: standardApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WG-7832/4 /3UV',
            file: 'wg-783243UV.html',
            asset: 'wg-783243UV',
            category: 'Special Pad Print',
            type: 'Fully automatic 1–4-color UV bottle-cap printing line',
            catalog: 'Fully automated UV printing line for round plastic bottle caps, with up to four colors and lacquer.',
            description: 'Winon specifies this system for round plastic mineral-water and beverage caps. It combines automatic feeding, surface treatment, registered pad printing, UV curing, and automated discharge and packing.',
            specs: [['Printed cap size', 'Ø28–38 mm × 19–22 mm'], ['Maximum printing area', 'Ø34 mm'], ['Maximum operating speed', '90,000 pcs/hour'], ['UV lamp power', '1.8 kW each'], ['Power requirement', '380 V, 3 phase, 50 Hz (47 A); 220 V (62 A)'], ['Pneumatic requirement', '5–7 bar'], ['Total power', '18 kW'], ['Mechanical volume', '6,400 × 1,500 × 1,700 mm'], ['Weight', '6,400 kg'], ['Printable colors', '1–4 colors + lacquer'], ['UV systems', '3'], ['Production-line area', '15,000 × 3,200 × 2,600 mm']],
            features: [['fa-conveyor-belt', 'Automated cap handling', 'Automatic selection, feeding, treatment, discharge, counting, packing, and encasement.'], ['fa-layer-group', 'Registered multi-color printing', 'Two magnetic-plate heads with micro adjustment support registration and ink-trapping methods.'], ['fa-sun', 'Integrated UV curing', 'Three UV systems with automatic lamp control and air extraction.']],
            applications: [['fa-bottle-droplet', 'Mineral-Water Caps', 'Round plastic caps for bottled mineral water.'], ['fa-bottle-droplet', 'Beverage Caps', 'Round plastic caps for drinks and related beverage packaging.'], ['fa-circle', 'Round Plastic Caps', 'Dedicated high-volume cap-printing production.']],
            applicationImage: 'application-areas.jpg',
            applicationIntro: 'Winon identifies this line for round plastic bottle caps, especially mineral-water and beverage-cap production.',
            hasTechnicalDrawing: false,
            hasCloseUp: true
        },
        {
            id: 'WN-140TEC-XY',
            file: 'wn-140TEC-XY.html',
            asset: 'wn-140TEC-XY',
            category: 'Special Pad Print',
            type: 'Special pad-printing configuration',
            catalog: 'Special-purpose pad-printing configuration for application-specific production requirements.',
            description: 'Winon lists the WN-140TEC-XY in its Special Pad Print range. Its published product page contains the model image but no technical specification; contact Printway for configuration review.',
            specs: [['Model', 'WN-140TEC-XY'], ['Technical specification', 'Available from Printway on request'], ['Configuration review', 'Recommended before final selection']],
            features: [['fa-wand-magic-sparkles', 'Specialized configuration', 'A special-pad-print system selected around the product, artwork, tooling, and production requirements.'], ['fa-screwdriver-wrench', 'Tooling review', 'Printway can review pads, plates, fixtures, inks, and surface preparation.'], ['fa-headset', 'Technical support', 'Confirm the final configuration and production suitability with Printway.']],
            applications: standardApplications,
            hasTechnicalDrawing: false,
            hasCloseUp: false
        },
        {
            id: 'WN-122PE6',
            file: 'wn-122PE6.html',
            asset: 'wn-122PE6',
            category: 'Special Pad Print',
            type: 'Special pad-printing configuration',
            catalog: 'Special-purpose pad-printing configuration for custom product-marking requirements.',
            description: 'Winon lists the WN-122PE6 in its Special Pad Print range. Its published product page contains the model image but no technical specification; contact Printway for configuration review.',
            specs: [['Model', 'WN-122PE6'], ['Technical specification', 'Available from Printway on request'], ['Configuration review', 'Recommended before final selection']],
            features: [['fa-wand-magic-sparkles', 'Specialized configuration', 'A special-pad-print system selected around the product, artwork, tooling, and production requirements.'], ['fa-screwdriver-wrench', 'Tooling review', 'Printway can review pads, plates, fixtures, inks, and surface preparation.'], ['fa-headset', 'Technical support', 'Confirm the final configuration and production suitability with Printway.']],
            applications: standardApplications,
            hasTechnicalDrawing: false,
            hasCloseUp: false
        },
        {
            id: 'WN-140TEC / R6 / 3S',
            file: 'wn-140TECR63S.html',
            asset: 'wn-140TECR63S',
            category: 'Pad Automation',
            type: 'Fully automated sealed ink-cup pad printing system',
            catalog: 'Automated high-precision sealed-cup system for mass production and registered product printing.',
            description: 'Winon describes this automated system as using automatic feeding and discharge, PLC/touch-screen control, and an optional servo-driven pad-down motion for smooth, precise production.',
            specs: [['Cleaning device', 'Yes'], ['Single cycle', 'Yes'], ['Ink cup', 'Ø86 mm'], ['Printing speed', '1,200 pcs/hour'], ['Printing accuracy', '±0.02 mm'], ['Cliché size', '100 × 250 mm'], ['Printing area', 'Ø70 mm'], ['Print force', '100 kg'], ['Controller', 'Touch screen'], ['Power supply', '380 V'], ['Electric power', '4,000 kW (per Winon listing)'], ['External dimensions', '2,100 × 1,495 × 1,978 mm']],
            features: [['fa-conveyor-belt', 'Automated handling', 'Fully automatic feeding and discharge support a streamlined production workflow.'], ['fa-crosshairs', 'High-precision registration', 'Winon specifies accuracy of ±0.02 mm for precision work.'], ['fa-microchip', 'PLC and touch-screen control', 'PLC control and a touch-screen interface support repeatable production settings.']],
            applications: standardApplications,
            applicationImage: 'application-areas.jpg',
            applicationIntro: 'Winon recommends this high-precision automated system for mass production and registered printing on electronic, hardware, and plastic products.',
            hasTechnicalDrawing: false,
            hasCloseUp: true
        },
        {
            id: 'WN-137 / 8S / 1',
            file: 'wn-1378S1.html',
            asset: 'wn-1378S1',
            category: 'Pad Automation',
            type: 'Automatic eight-color egg-package pad printing machine',
            catalog: 'Eight-color automated system for egg-package printing with a rotary table and conveyor workflow.',
            description: 'Winon specifies the WN-137/8S/1 for eight-color egg-package pad printing. The machine uses PLC/touch-screen control, a 28-station rotary worktable, servo pad movement, and three-side rotary printing.',
            specs: [['Printing colors', '8'], ['Maximum steel-plate size', '150 × 250 mm'], ['Maximum printing area', '100 × 200 mm'], ['Maximum printing height', '200 mm'], ['Printing speed', '700–800 pcs/hour'], ['Air supply', '6 bar'], ['Power specification', '380 V, 50–60 Hz'], ['Dimensions', '3,510 × 1,821 × 1,667 mm']],
            features: [['fa-layer-group', 'Eight-color production', 'Designed for eight-color egg-package printing.'], ['fa-rotate', 'Rotary production workflow', 'A conveyor-linked, 28-station rotary table supports three-side rotary printing.'], ['fa-shield-halved', 'Safe operation', 'Winon lists high-speed, smooth operation and an emergency-stop button.']],
            applications: [['fa-egg', 'Egg Packaging', 'Dedicated automated pad printing for egg-package production.'], ['fa-box', 'High-Volume Packaging', 'Repeatable multi-color graphics for packaging workflows.'], ['fa-gears', 'Registered Production', 'Production where consistent color registration is required.']],
            applicationImage: 'application-areas.jpg',
            applicationIntro: 'Winon positions this automated eight-color system for egg-package printing and high-volume registered production.',
            hasTechnicalDrawing: false,
            hasCloseUp: true
        },
        {
            id: 'WN-125TEG1-R8-3S',
            file: 'wn-125TEG1R83S.html',
            asset: 'wn-125TEG1R83S',
            category: 'Pad Automation',
            type: 'Pad automation configuration',
            catalog: 'Automated pad-printing configuration for application-specific production workflows.',
            description: 'Winon lists the WN-125TEG1-R8-3S in its Pad Automation range. Its published product page contains the model image but no technical specification; contact Printway for configuration review.',
            specs: [['Model', 'WN-125TEG1-R8-3S'], ['Technical specification', 'Available from Printway on request'], ['Configuration review', 'Recommended before final selection']],
            features: [['fa-robot', 'Automated configuration', 'An automation system to be specified around the production workflow and finished product.'], ['fa-screwdriver-wrench', 'Tooling review', 'Printway can review pads, plates, fixtures, inks, and surface preparation.'], ['fa-headset', 'Technical support', 'Confirm the final configuration and production suitability with Printway.']],
            applications: standardApplications,
            hasTechnicalDrawing: false,
            hasCloseUp: false
        }
    ];

    const escapeHtml = function (value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character];
        });
    };

    const imageBase = function (model) {
        return '../images/machines/pad-printing/' + model.asset + '/';
    };

    const feature = function (icon, title, text) {
        return '<div class="feature-box"><div class="feature-icon"><i class="fa-solid ' + icon + '" aria-hidden="true"></i></div><div><h3>' + escapeHtml(title) + '</h3><p>' + escapeHtml(text) + '</p></div></div>';
    };

    const applicationCards = function (model) {
        return model.applications.map(function (item) {
            return '<article class="application-card"><div class="application-icon"><i class="fa-solid ' + item[0] + '" aria-hidden="true"></i></div><h3>' + escapeHtml(item[1]) + '</h3><p>' + escapeHtml(item[2]) + '</p></article>';
        }).join('');
    };

    const renderApplications = function (model, heading, intro) {
        const image = model.applicationImage
            ? '<div class="application-area-layout"><div class="application-area-image"><img src="' + imageBase(model) + model.applicationImage + '" alt="Application areas for ' + escapeHtml(model.id) + '"></div><div class="application-area-content"><h3>Application Areas</h3><p>' + escapeHtml(model.applicationIntro || intro) + '</p></div></div>'
            : '';

        return '<section class="machine-applications" aria-labelledby="applications-title"><div class="section-header"><h2 id="applications-title">' + escapeHtml(heading) + '</h2><p>' + escapeHtml(intro) + '</p></div>' + image + '<div class="application-grid">' + applicationCards(model) + '</div></section>';
    };

    const renderDrawing = function (model) {
        const base = imageBase(model);
        const name = 'Winon ' + model.id;

        return '<section class="machine-drawing" aria-labelledby="drawing-title"><div class="section-header"><h2 id="drawing-title">Technical Drawing</h2><p>Use the drawing as an installation and layout reference. Confirm final space, utilities, tooling, and production requirements with Printway before installation.</p></div><div class="drawing-container"><img src="' + base + 'technical-drawing.jpg" alt="Technical drawing of ' + escapeHtml(name) + '"></div><div class="drawing-info"><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i></div><h3>Machine Dimensions</h3><p>Reference the drawing when planning the machine footprint and work area.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-industry" aria-hidden="true"></i></div><h3>Production Layout</h3><p>Plan the operator position, fixture access, and surrounding production flow.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i></div><h3>Installation Review</h3><p>Confirm electrical, compressed-air, tooling, and safety requirements before installation.</p></div></div></section>';
    };

    const renderCatalogue = function () {
        const specialGrid = document.getElementById('special-pad-print-grid');
        const automationGrid = document.getElementById('pad-automation-grid');
        const cards = function (models) {
            return models.map(function (model) {
                return '<article class="machine-product-card"><img src="' + imageBase(model) + 'main-photo.jpg" alt="Winon ' + escapeHtml(model.id) + ' pad printing machine"><div class="machine-product-content"><span>' + escapeHtml(model.category) + '</span><h2>' + escapeHtml(model.id) + '</h2><p>' + escapeHtml(model.catalog) + '</p><a href="' + model.file + '" class="machine-btn">View details <i class="fas fa-arrow-right" aria-hidden="true"></i></a></div></article>';
            }).join('');
        };

        if (specialGrid) {
            specialGrid.innerHTML = cards(definitions.filter(function (model) {
                return model.category === 'Special Pad Print';
            }));
        }

        if (automationGrid) {
            automationGrid.innerHTML = cards(definitions.filter(function (model) {
                return model.category === 'Pad Automation';
            }));
        }
    };

    const renderDetail = function (model) {
        const main = document.querySelector('main');
        if (!main) {
            return;
        }

        const name = 'Winon ' + model.id;
        const base = imageBase(model);
        const quote = '../index.html?model=' + encodeURIComponent(name) + '#contact';
        const details = [['Model', model.id], ['Machine Category', model.category]].concat(model.specs).map(function (item) {
            return '<tr><th scope="row">' + escapeHtml(item[0]) + '</th><td>' + escapeHtml(item[1]) + '</td></tr>';
        }).join('');
        const featurePhoto = model.hasCloseUp ? base + 'close-up.jpg' : base + 'main-photo.jpg';
        const featurePhotoAlt = model.hasCloseUp ? 'Close-up of ' + name : name + ' pad printing machine';
        const features = model.features.map(function (item) {
            return feature(item[0], item[1], item[2]);
        }).join('');
        const applications = renderApplications(
            model,
            model.hasTechnicalDrawing ? 'Typical Applications' : 'Application Areas',
            model.hasTechnicalDrawing
                ? 'This model can be specified for a range of products. Confirm surface compatibility, artwork, tooling, inks, and production requirements with Printway.'
                : 'This model does not have a supplied technical drawing, so the page shows application areas instead. Confirm final production suitability with Printway.'
        );

        document.title = name + ' | ' + model.category + ' | Printway';
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', name + ' ' + model.type.toLowerCase() + ' from Printway Marketing & Services.');
        }

        main.innerHTML =
            '<section class="machine-hero" aria-labelledby="machine-title"><div class="machine-main-photo"><img src="' + base + 'main-photo.jpg" alt="' + escapeHtml(name) + ' pad printing machine"></div><div class="machine-information"><p class="machine-eyebrow">' + escapeHtml(model.category.toUpperCase()) + '</p><h1 id="machine-title">' + escapeHtml(name) + '</h1><h2>' + escapeHtml(model.type) + '</h2><p class="machine-brand">Winon Industrial Co., Ltd. &mdash; Hong Kong</p><p>' + escapeHtml(model.description) + '</p><h3>Technical Details</h3><table class="machine-spec-table"><tbody>' + details + '</tbody></table><p class="machine-spec-note">Specifications are based on Winon’s published product listing where available. Confirm final options and production suitability with Printway.</p></div></section>' +
            '<section class="machine-feature-section" aria-labelledby="features-title"><div class="feature-image"><img src="' + featurePhoto + '" alt="' + escapeHtml(featurePhotoAlt) + '"></div><div class="feature-content"><p class="machine-eyebrow">BUILT FOR PRODUCTION</p><h2 id="features-title">Production Features</h2><div class="feature-list">' + features + '</div></div></section>' +
            applications +
            (model.hasTechnicalDrawing ? renderDrawing(model) : '') +
            '<section class="machine-contact-box" aria-labelledby="contact-title"><h2 id="contact-title">Interested in the ' + escapeHtml(name) + '?</h2><p>Contact Printway Marketing &amp; Services for pricing, machine configuration, product testing, spare parts, consumables, and technical support.</p><a href="' + quote + '" class="quote-button">Request a Quote</a></section>';

        const floatingQuote = document.querySelector('.quote-floating');
        if (floatingQuote) {
            floatingQuote.href = quote;
        }
    };

    const currentFile = window.location.pathname.split('/').pop().toLowerCase();
    const currentModel = definitions.find(function (model) {
        return model.file.toLowerCase() === currentFile;
    });

    if (currentModel) {
        renderDetail(currentModel);
    } else {
        renderCatalogue();
    }
}());

/* ==========================================
   MULTI-COLOR CATALOGUES AND DETAIL PAGES
========================================== */

(function () {
    const definitions = [
        ['WN-117', 'wn-117.html', 'wn-117', 'Multi Color Inkwell', 'Open inkwell', true],
        ['WN-118', 'wn-118.html', 'wn-118', 'Multi Color Inkwell', 'Open inkwell', true],
        ['WN-127', 'wn-127.html', 'wn-127', 'Multi Color Inkwell', 'Open inkwell', true],
        ['WN-130', 'wn-130.html', 'wn-130', 'Multi Color Inkwell', 'Open inkwell', true],
        ['WN-132', 'wn-132.html', 'wn-132', 'Multi Color Inkwell', 'Open inkwell', true],
        ['WN-132L', 'wn-132L.html', 'wn-132L', 'Multi Color Inkwell', 'Open inkwell', true],
        ['WN-133', 'wn-133.html', 'wn-133', 'Multi Color Inkwell', 'Open inkwell', true],
        ['WN-136', 'wn-136.html', 'wn-136', 'Multi Color Inkwell', 'Open inkwell', true],
        ['WN-137', 'wn-137.html', 'wn-137', 'Multi Color Inkwell', 'Open inkwell', true],
        ['WN-138', 'wn-138.html', 'wn-138', 'Multi Color Inkwell', 'Open inkwell', true],
        ['WN-165', 'wn-165.html', 'wn-165', 'Multi Color Inkwell', 'Open inkwell', true],
        ['WN-165L', 'wn-165L.html', 'wn-165L', 'Multi Color Inkwell', 'Open inkwell', true],
        ['WN-168', 'wn-168.html', 'wn-168', 'Multi Color Inkwell', 'Open inkwell', true],
        ['WN-165EX', 'wn-165EX.html', 'wn-165EX', 'Multi Color Inkwell', 'Open inkwell', false],
        ['WN-117E', 'wn-117E.html', 'wn-117E', 'Multi Color Inkcup', 'Sealed ink cup', true],
        ['WN-118E', 'wn-118E.html', 'wn-118E', 'Multi Color Inkcup', 'Sealed ink cup', true],
        ['WN-127E', 'wn-127E.html', 'wn-127E', 'Multi Color Inkcup', 'Sealed ink cup', true],
        ['WN-138E', 'wn-138E.html', 'wn-138E', 'Multi Color Inkcup', 'Sealed ink cup', true],
        ['WN-128E', 'wn-128E.html', 'wn-128E', 'Multi Color Inkcup', 'Sealed ink cup', true],
        ['WN-130E', 'wn-130E.html', 'wn-130E', 'Multi Color Inkcup', 'Sealed ink cup', true],
        ['WN-132E', 'wn-132E.html', 'wn-132E', 'Multi Color Inkcup', 'Sealed ink cup', true],
        ['WN-132LE', 'wn-132LE.html', 'wn-132LE', 'Multi Color Inkcup', 'Sealed ink cup', true],
        ['WN-133E', 'wn-133E.html', 'wn-133E', 'Multi Color Inkcup', 'Sealed ink cup', true],
        ['WN-136E', 'wn-136E.html', 'wn-136E', 'Multi Color Inkcup', 'Sealed ink cup', true],
        ['WN-137E', 'wn-137E.html', 'wn-137E', 'Multi Color Inkcup', 'Sealed ink cup', true],
        ['WN-165LE', 'wn-165LE.html', 'wn-165LE', 'Multi Color Inkcup', 'Sealed ink cup', true],
        ['WN-250ECGS / M / 4S', 'wn-250ECGSM4S.html', 'wn-250ECGSM4S', 'Multi Color Inkcup', 'Sealed ink cup', true]
    ];

    const models = definitions.map(function (item) {
        return {
            id: item[0],
            file: item[1],
            asset: item[2],
            variant: item[3],
            ink: item[4],
            hasSupportingImages: item[5]
        };
    });

    const escapeHtml = function (value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character];
        });
    };

    const imageBase = function (model) {
        return '../images/machines/pad-printing/' + model.asset + '/';
    };

    const feature = function (icon, title, text) {
        return '<div class="feature-box"><div class="feature-icon"><i class="fa-solid ' + icon + '" aria-hidden="true"></i></div><div><h3>' + escapeHtml(title) + '</h3><p>' + escapeHtml(text) + '</p></div></div>';
    };

    const applications = function () {
        const items = [
            ['fa-cube', 'Plastic Components', 'Molded housings, covers, buttons, switches, and product components.'],
            ['fa-microchip', 'Electronic Products', 'Control panels, remote controls, keyboards, and electronic accessories.'],
            ['fa-bottle-droplet', 'Packaging & Containers', 'Bottles, caps, containers, and branded packaging components.'],
            ['fa-gift', 'Promotional Items', 'Pens, keychains, gifts, and customised branded goods.'],
            ['fa-car', 'Automotive Parts', 'Knobs, switches, trim pieces, and interior components.'],
            ['fa-gears', 'Industrial Components', 'Parts that require registered multi-color logos, symbols, or identification markings.']
        ];

        return items.map(function (item) {
            return '<div class="product-card"><div class="product-icon"><i class="fa-solid ' + item[0] + '" aria-hidden="true"></i></div><h3>' + item[1] + '</h3><p>' + item[2] + '</p></div>';
        }).join('');
    };

    const catalogueCards = function (items) {
        return items.map(function (model) {
            const description = model.ink === 'Sealed ink cup'
                ? 'Multi-color sealed ink-cup machine for clean, controlled registration and repeat production.'
                : 'Multi-color open-inkwell machine for registered graphics, logos, and product marking.';

            return '<article class="machine-product-card"><img src="' + imageBase(model) + 'main-photo.jpg" alt="Winon ' + escapeHtml(model.id) + ' multi-color pad printing machine"><div class="machine-product-content"><span>Multi Color &middot; ' + escapeHtml(model.ink) + '</span><h2>' + escapeHtml(model.id) + '</h2><p>' + description + '</p><a href="' + model.file + '" class="machine-btn">View details <i class="fas fa-arrow-right" aria-hidden="true"></i></a></div></article>';
        }).join('');
    };

    const renderCatalogue = function () {
        const inkwellGrid = document.getElementById('multi-color-inkwell-grid');
        const inkcupGrid = document.getElementById('multi-color-inkcup-grid');

        if (inkwellGrid) {
            inkwellGrid.innerHTML = catalogueCards(models.filter(function (model) {
                return model.variant === 'Multi Color Inkwell';
            }));
        }

        if (inkcupGrid) {
            inkcupGrid.innerHTML = catalogueCards(models.filter(function (model) {
                return model.variant === 'Multi Color Inkcup';
            }));
        }
    };

    const renderDetail = function (model) {
        const main = document.querySelector('main');
        if (!main) {
            return;
        }

        const name = 'Winon ' + model.id;
        const base = imageBase(model);
        const usesInkCup = model.ink === 'Sealed ink cup';
        const type = 'Automatic multi-color ' + (usesInkCup ? 'ink-cup' : 'open-inkwell') + ' pad printing machine';
        const quote = '../index.html?model=' + encodeURIComponent(name) + '#contact';
        const introduction = usesInkCup
            ? 'The sealed ink-cup system supports clean ink handling for controlled multi-color production and registration.'
            : 'The open-inkwell system provides direct access for multi-color ink and doctor-blade setup during production.';
        const featurePhoto = model.hasSupportingImages ? base + 'close-up.jpg' : base + 'main-photo.jpg';
        const featurePhotoAlt = model.hasSupportingImages
            ? 'Close-up of ' + name + ' multi-color pad printing machine'
            : name + ' multi-color pad printing machine';
        const drawingSection = model.hasSupportingImages
            ? '<section class="machine-drawing" aria-labelledby="drawing-title"><div class="section-header"><h2 id="drawing-title">Technical Drawing</h2><p>Use the drawing as an installation and layout reference. Confirm final space, utilities, tooling, and production requirements with Printway before installation.</p></div><div class="drawing-container"><img src="' + base + 'technical-drawing.jpg" alt="Technical drawing of ' + escapeHtml(name) + ' multi-color pad printing machine"></div><div class="drawing-info"><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i></div><h3>Machine Dimensions</h3><p>Reference the drawing when planning the machine footprint and work area.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-industry" aria-hidden="true"></i></div><h3>Production Layout</h3><p>Plan the operator position, fixture access, and surrounding production flow.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i></div><h3>Installation Review</h3><p>Confirm electrical, compressed-air, tooling, and safety requirements before installation.</p></div></div></section>'
            : '<section class="machine-drawing" aria-labelledby="drawing-title"><div class="section-header"><h2 id="drawing-title">Technical Drawing</h2><p>A technical drawing for this configuration is available from Printway on request. Contact us to confirm the final footprint, utilities, tooling, and production requirements.</p></div></section>';

        document.title = name + ' | Multi-Color Pad Printing Machine | Printway';
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', name + ' ' + type.toLowerCase() + ' from Printway Marketing & Services.');
        }

        main.innerHTML =
            '<section class="machine-hero" aria-labelledby="machine-title">' +
                '<div class="machine-main-photo"><img src="' + base + 'main-photo.jpg" alt="' + escapeHtml(name) + ' multi-color pad printing machine"></div>' +
                '<div class="machine-information"><p class="machine-eyebrow">' + escapeHtml(model.variant.toUpperCase()) + ' PAD PRINTING</p><h1 id="machine-title">' + escapeHtml(name) + '</h1><h2>' + escapeHtml(type) + '</h2><p class="machine-brand">Winon Industrial Co., Ltd. &mdash; Hong Kong</p><p>Configured for registered multi-color graphics, logos, and product identification. Confirm the final number of colors, artwork, tooling, pads, plates, and inks with Printway for your product.</p><p>' + escapeHtml(introduction) + '</p><h3>Key Details</h3><table class="machine-spec-table"><tbody>' +
                    '<tr><th scope="row">Model</th><td>' + escapeHtml(model.id) + '</td></tr><tr><th scope="row">Printing Colors</th><td>Multi Color</td></tr><tr><th scope="row">Ink System</th><td>' + escapeHtml(model.ink) + '</td></tr><tr><th scope="row">Production Focus</th><td>Registered multi-color product graphics</td></tr><tr><th scope="row">Configuration</th><td>Confirm final production requirements with Printway</td></tr>' +
                    '</tbody></table><p class="machine-spec-note">Contact Printway for the full technical specification, available options, and a production suitability review.</p></div></section>' +
            '<section class="machine-feature-section" aria-labelledby="features-title"><div class="feature-image"><img src="' + featurePhoto + '" alt="' + escapeHtml(featurePhotoAlt) + '"></div><div class="feature-content"><p class="machine-eyebrow">BUILT FOR MULTI-COLOR WORK</p><h2 id="features-title">Production Features</h2><div class="feature-list">' +
                feature('fa-layer-group', 'Multi-color registration', 'Designed for registered multi-color logos, graphics, and product-identification workflows.') +
                feature(usesInkCup ? 'fa-droplet' : 'fa-palette', usesInkCup ? 'Sealed ink-cup system' : 'Open inkwell system', introduction) +
                feature('fa-crosshairs', 'Configurable print setup', 'Pads, plates, fixtures, inks, and surface preparation are selected for the product and finish.') +
                feature('fa-screwdriver-wrench', 'Production suitability review', 'Printway can review samples, production goals, and available machine options before final selection.') +
            '</div></div></section>' +
            '<section class="printable-products" aria-labelledby="products-title"><div class="section-header"><h2 id="products-title">Typical Applications</h2><p>The ' + escapeHtml(name) + ' can be specified for products that require registered multi-color printing. Print results depend on the surface, ink system, artwork, and production setup.</p></div><div class="products-grid">' + applications() + '</div></section>' +
            drawingSection +
            '<section class="machine-contact-box" aria-labelledby="contact-title"><h2 id="contact-title">Interested in the ' + escapeHtml(name) + '?</h2><p>Contact Printway Marketing &amp; Services for pricing, machine configuration, product testing, spare parts, consumables, and technical support.</p><a href="' + quote + '" class="quote-button">Request a Quote</a></section>';

        const floatingQuote = document.querySelector('.quote-floating');
        if (floatingQuote) {
            floatingQuote.href = quote;
        }
    };

    const currentFile = window.location.pathname.split('/').pop().toLowerCase();
    const currentModel = models.find(function (model) {
        return model.file.toLowerCase() === currentFile;
    });

    if (currentModel) {
        renderDetail(currentModel);
    } else {
        renderCatalogue();
    }
}());

/* ==========================================
   TWO-COLOR INKCUP CATALOGUE AND DETAIL PAGES
========================================== */

(function () {
    const definitions = [
        ['WN-139PECGS', 'wn-139PECGS.html', 'wn-139PECGS', 'Long-format side-way registration', 'A large two-color ink-cup model for long graphics and registered product markings.', 'Touch-screen control', [
            ['Ink Cup Diameter', 'Ø135 mm'], ['Maximum Workpiece Height', '200 mm'], ['Production Speed', 'Up to 600 pcs/hour'], ['Cliché Size', '100 × 350 mm'], ['Maximum Printing Area', '60 × 170 mm'], ['Power Supply', 'AC 110V or 220V, 50/60Hz'], ['Electrical / Air Requirement', '20W / 6 bar'], ['External Dimensions', '1,025 × 1,200 × 2,007 mm']
        ]],
        ['WN-121ASE', 'wn-121ASE.html', 'wn-121ASE', 'Compact floor-standing format', 'A compact two-color ink-cup machine for accurate logos and graphics on small production parts.', 'Touch-screen control', [
            ['Ink Cup Diameter', 'Ø60 mm'], ['Maximum Workpiece Height', '200 mm'], ['Production Speed', 'Up to 1,400 pcs/hour'], ['Cliché Size', '75 × 150 mm'], ['Maximum Printing Area', 'Ø50 mm'], ['Power Supply', 'AC 110V or 220V, 50/60Hz'], ['Electrical / Air Requirement', '20W / 6 bar'], ['External Dimensions', '590 × 520 × 1,240 mm']
        ]],
        ['WN-121SE', 'wn-121SE.html', 'wn-121SE', 'Compact benchtop format', 'A compact two-color ink-cup model for high-speed printing on lower-profile components.', 'Touch-screen control', [
            ['Ink Cup Diameter', 'Ø60 mm'], ['Maximum Workpiece Height', '50 mm'], ['Production Speed', 'Up to 1,400 pcs/hour'], ['Cliché Size', '75 × 150 mm'], ['Maximum Printing Area', 'Ø50 mm'], ['Power Supply', 'AC 110V or 220V, 50/60Hz'], ['Electrical / Air Requirement', '20W / 6 bar'], ['External Dimensions', '560 × 480 × 540 mm']
        ]],
        ['WN-123AE', 'wn-123AE.html', 'wn-123AE', 'Standard production format', 'A two-color ink-cup printer with a Ø86 mm cup and a Ø75 mm print area for general production work.', 'Touch-screen control', [
            ['Ink Cup Diameter', 'Ø86 mm'], ['Maximum Workpiece Height', '240 mm'], ['Production Speed', 'Up to 1,200 pcs/hour'], ['Cliché Size', '100 × 200 mm'], ['Maximum Printing Area', 'Ø75 mm'], ['Power Supply', 'AC 110V or 220V, 50/60Hz'], ['Electrical / Air Requirement', '20W / 6 bar'], ['External Dimensions', '770 × 650 × 1,400 mm']
        ]],
        ['WN-123AEG', 'wn-123AEG.html', 'wn-123AEG', 'Standard production format', 'A two-color ink-cup machine designed for accurate two-color registration on industrial and consumer components.', 'Microelectronic IC control', [
            ['Ink Cup Diameter', 'Ø86 mm'], ['Maximum Workpiece Height', '240 mm'], ['Printing Precision', '±0.02 mm'], ['Cliché Size', '100 × 200 mm'], ['Maximum Printing Area', 'Ø75 mm'], ['Printing Force', '100 kg'], ['Pad Cleaning Device', 'No'], ['Single Cycle', 'Yes'], ['Power Supply', 'AC 110V or 220V, 50/60Hz'], ['Electrical / Air Requirement', '20W / 6 bar'], ['External Dimensions', '770 × 650 × 1,400 mm']
        ]],
        ['WN-123E', 'wn-123E.html', 'wn-123E', 'Standard benchtop format', 'A two-color ink-cup printer for compact, low-profile workpieces and repeat graphics.', 'Touch-screen control', [
            ['Ink Cup Diameter', 'Ø86 mm'], ['Maximum Workpiece Height', '70 mm'], ['Production Speed', 'Up to 1,200 pcs/hour'], ['Cliché Size', '100 × 200 mm'], ['Maximum Printing Area', 'Ø75 mm'], ['Power Supply', 'AC 110V or 220V, 50/60Hz'], ['Electrical / Air Requirement', '20W / 6 bar'], ['External Dimensions', '700 × 580 × 700 mm']
        ]],
        ['WN-123PE', 'wn-123PE.html', 'wn-123PE', 'Standard floor-standing format', 'A two-color ink-cup model for production parts requiring a Ø75 mm print area and taller workpiece clearance.', 'Touch-screen control', [
            ['Ink Cup Diameter', 'Ø86 mm'], ['Maximum Workpiece Height', '240 mm'], ['Production Speed', 'Up to 1,000 pcs/hour'], ['Cliché Size', '100 × 200 mm'], ['Maximum Printing Area', 'Ø75 mm'], ['Power Supply', 'AC 110V or 220V, 50/60Hz'], ['Electrical / Air Requirement', '20W / 6 bar'], ['External Dimensions', '770 × 650 × 1,400 mm']
        ]],
        ['WN-131PE', 'wn-131PE.html', 'wn-131PE', 'Large-format floor-standing production', 'A large two-color ink-cup machine for graphics and product identification on taller production components.', 'Touch-screen control', [
            ['Ink Cup Diameter', 'Ø135 mm'], ['Maximum Workpiece Height', '250 mm'], ['Production Speed', 'Up to 900 pcs/hour'], ['Cliché Size', '150 × 300 mm'], ['Maximum Printing Area', 'Ø120 mm'], ['Power Supply', 'AC 110V or 220V, 50/60Hz'], ['Electrical / Air Requirement', '20W / 6 bar'], ['External Dimensions', '920 × 1,060 × 1,450 mm']
        ]],
        ['WN-131PEC', 'wn-131PEC.html', 'wn-131PEC', 'Large-format floor-standing production', 'A large two-color ink-cup configuration with generous print area and workpiece clearance for production applications.', 'Touch-screen control', [
            ['Ink Cup Diameter', 'Ø135 mm'], ['Maximum Workpiece Height', '250 mm'], ['Production Speed', 'Up to 900 pcs/hour'], ['Cliché Size', '150 × 300 mm'], ['Maximum Printing Area', 'Ø120 mm'], ['Power Supply', 'AC 110V or 220V, 50/60Hz'], ['Electrical / Air Requirement', '20W / 6 bar'], ['External Dimensions', '920 × 1,060 × 1,450 mm']
        ]],
        ['WN-139E', 'wn-139E.html', 'wn-139E', 'Large rectangular print format', 'A two-color ink-cup machine for larger, rectangular graphics and product marking on production parts.', 'Touch-screen control', [
            ['Ink Cup Diameter', 'Ø135 mm'], ['Maximum Workpiece Height', '200 mm'], ['Production Speed', 'Up to 700 pcs/hour'], ['Cliché Size', '150 × 350 mm'], ['Maximum Printing Area', '110 × 150 mm'], ['Power Supply', 'AC 110V or 220V, 50/60Hz'], ['Electrical / Air Requirement', '20W / 6 bar'], ['External Dimensions', '1,170 × 800 × 1,690 mm']
        ]],
        ['WN-139EG', 'wn-139EG.html', 'wn-139EG', 'Large rectangular print format', 'A two-color ink-cup configuration for wider graphics, branded panels, and product-identification layouts.', 'Touch-screen control', [
            ['Ink Cup Diameter', 'Ø135 mm'], ['Maximum Workpiece Height', '200 mm'], ['Production Speed', 'Up to 700 pcs/hour'], ['Cliché Size', '150 × 300 mm'], ['Maximum Printing Area', '110 × 150 mm'], ['Power Supply', 'AC 110V or 220V, 50/60Hz'], ['Electrical / Air Requirement', '20W / 6 bar'], ['External Dimensions', '1,170 × 800 × 1,690 mm']
        ]],
        ['WN-160AEL/2', 'wn-160AEL2.html', 'wn-160AEL2', 'Two-color floor-standing production', 'A two-color ink-cup machine for accurate registered printing on products up to 240 mm high.', 'Touch-screen control', [
            ['Ink Cup Diameter', 'Ø86 mm'], ['Maximum Workpiece Height', '240 mm'], ['Production Speed', 'Up to 1,200 pcs/hour'], ['Cliché Size', '100 × 200 mm'], ['Maximum Printing Area', 'Ø75 mm'], ['Power Supply', 'AC 110V or 220V, 50/60Hz'], ['Electrical / Air Requirement', '20W / 6 bar'], ['External Dimensions', '770 × 650 × 1,400 mm']
        ]],
        ['WN-162E', 'wn-162E.html', 'wn-162E', 'Large-format floor-standing production', 'A large two-color ink-cup printer with a Ø120 mm print area for production parts and product markings.', 'Touch-screen control', [
            ['Ink Cup Diameter', 'Ø135 mm'], ['Maximum Workpiece Height', '250 mm'], ['Production Speed', 'Up to 900 pcs/hour'], ['Cliché Size', '150 × 300 mm'], ['Maximum Printing Area', 'Ø120 mm'], ['Power Supply', 'AC 110V or 220V, 50/60Hz'], ['Electrical / Air Requirement', '20W / 6 bar'], ['External Dimensions', '1,070 × 800 × 1,620 mm']
        ]],
        ['WN-129E', 'wn-129E.html', 'wn-129E', 'High-speed standard production', 'A two-color ink-cup printer for repeat production, combining a Ø75 mm print area with a listed speed of up to 1,500 pcs/hour.', 'Touch-screen control', [
            ['Ink Cup Diameter', 'Ø86 mm'], ['Maximum Workpiece Height', '180 mm'], ['Production Speed', 'Up to 1,500 pcs/hour'], ['Cliché Size', '100 × 200 mm'], ['Maximum Printing Area', 'Ø75 mm'], ['Power Supply', 'AC 110V or 220V, 50/60Hz'], ['Electrical / Air Requirement', '20W / 6 bar'], ['External Dimensions', '860 × 710 × 1,400 mm']
        ]],
        ['WN-131E', 'wn-131E.html', 'wn-131E', 'Large-format production', 'A two-color ink-cup machine for larger graphics and product identification on components up to 200 mm high.', 'Touch-screen control', [
            ['Ink Cup Diameter', 'Ø135 mm'], ['Maximum Workpiece Height', '200 mm'], ['Production Speed', 'Up to 1,000 pcs/hour'], ['Cliché Size', '150 × 300 mm'], ['Maximum Printing Area', 'Ø120 mm'], ['Power Supply', 'AC 110V or 220V, 50/60Hz'], ['Electrical / Air Requirement', '20W / 6 bar'], ['External Dimensions', '920 × 630 × 1,450 mm']
        ]],
        ['WN-131EN', 'wn-131EN.html', 'wn-131EN', 'Large-format production', 'A two-color ink-cup configuration for registered printing on larger parts with a Ø120 mm print area.', 'Touch-screen control', [
            ['Ink Cup Diameter', 'Ø135 mm'], ['Maximum Workpiece Height', '200 mm'], ['Production Speed', 'Up to 1,000 pcs/hour'], ['Cliché Size', '150 × 300 mm'], ['Maximum Printing Area', 'Ø120 mm'], ['Power Supply', 'AC 110V or 220V, 50/60Hz'], ['Electrical / Air Requirement', '20W / 6 bar'], ['External Dimensions', '920 × 630 × 1,450 mm']
        ]]
    ];

    const models = definitions.map(function (item) {
        return { id: item[0], file: item[1], asset: item[2], format: item[3], catalog: item[4], control: item[5], specs: item[6] };
    });

    const escapeHtml = function (value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character];
        });
    };

    const imageBase = function (model) {
        return '../images/machines/pad-printing/' + model.asset + '/';
    };

    const feature = function (icon, title, text) {
        return '<div class="feature-box"><div class="feature-icon"><i class="fa-solid ' + icon + '" aria-hidden="true"></i></div><div><h3>' + escapeHtml(title) + '</h3><p>' + escapeHtml(text) + '</p></div></div>';
    };

    const applications = function () {
        const items = [
            ['fa-microchip', 'Electronic Controls', 'Keypads, control panels, phones, game controllers, and other electronic components.'],
            ['fa-cube', 'Plastic Components', 'Molded housings, covers, buttons, switches, and product components.'],
            ['fa-screwdriver-wrench', 'Hardware Parts', 'Hardware accessories and industrial parts requiring logos or identification markings.'],
            ['fa-gift', 'Toys & Promotional Items', 'Toys, gifts, promotional items, and branded consumer goods.'],
            ['fa-box', 'Consumer Products', 'Product logos, graphics, and identifiers on finished consumer products.'],
            ['fa-gears', 'Custom Production', 'Special tooling and configurations can be reviewed for specific production requirements.']
        ];

        return items.map(function (item) {
            return '<div class="product-card"><div class="product-icon"><i class="fa-solid ' + item[0] + '" aria-hidden="true"></i></div><h3>' + item[1] + '</h3><p>' + item[2] + '</p></div>';
        }).join('');
    };

    const renderCatalogue = function () {
        const grid = document.getElementById('two-color-inkcup-grid');
        if (!grid) {
            return;
        }

        grid.innerHTML = models.map(function (model) {
            return '<article class="machine-product-card"><img src="' + imageBase(model) + 'main-photo.jpg" alt="Winon ' + escapeHtml(model.id) + ' two-color ink-cup pad printing machine"><div class="machine-product-content"><span>2 Color &middot; Sealed ink cup</span><h2>' + escapeHtml(model.id) + '</h2><p>' + escapeHtml(model.catalog) + '</p><a href="' + model.file + '" class="machine-btn">View details <i class="fas fa-arrow-right" aria-hidden="true"></i></a></div></article>';
        }).join('');
    };

    const renderDetail = function (model) {
        const main = document.querySelector('main');
        if (!main) {
            return;
        }

        const name = 'Winon ' + model.id;
        const base = imageBase(model);
        const quote = '../index.html?model=' + encodeURIComponent(name) + '#contact';
        const details = [
            ['Model', model.id], ['Printing Colors', '2 Colors'], ['Ink System', 'Sealed Ink Cup'], ['Machine Format', model.format]
        ].concat(model.specs).map(function (item) {
            return '<tr><th scope="row">' + escapeHtml(item[0]) + '</th><td>' + escapeHtml(item[1]) + '</td></tr>';
        }).join('');

        document.title = name + ' | Two-Color Inkcup Pad Printing Machine | Printway';
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', name + ' two-color sealed ink-cup pad printing machine from Printway Marketing & Services.');
        }

        main.innerHTML =
            '<section class="machine-hero" aria-labelledby="machine-title">' +
                '<div class="machine-main-photo"><img src="' + base + 'main-photo.jpg" alt="' + escapeHtml(name) + ' two-color ink-cup pad printing machine"></div>' +
                '<div class="machine-information"><p class="machine-eyebrow">TWO-COLOR INKCUP PAD PRINTING</p><h1 id="machine-title">' + escapeHtml(name) + '</h1><h2>Two-Color Ink Cup Pad Printing Machine</h2><p class="machine-brand">Winon Industrial Co., Ltd. &mdash; Hong Kong</p><p>' + escapeHtml(model.catalog) + '</p><p>The sealed ink-cup system supports clean ink handling, while the two-color layout is designed for precise colour registration. Confirm print samples, tooling, pads, plates, and inks with Printway for your product.</p><h3>Technical Details</h3><table class="machine-spec-table"><tbody>' + details + '</tbody></table><p class="machine-spec-note">Specifications are based on Winon’s published product listing. Confirm available options and final production suitability with Printway.</p></div></section>' +
            '<section class="machine-feature-section" aria-labelledby="features-title"><div class="feature-image"><img src="' + base + 'close-up.jpg" alt="Close-up of ' + escapeHtml(name) + ' two-color ink-cup pad printing machine"></div><div class="feature-content"><p class="machine-eyebrow">BUILT FOR TWO-COLOR WORK</p><h2 id="features-title">Production Features</h2><div class="feature-list">' +
                feature('fa-layer-group', 'Two-color registration', 'Designed for registered two-color logos, graphics, and product-identification workflows.') +
                feature('fa-droplet', 'Sealed ink-cup system', 'Helps contain ink and reduce solvent evaporation during routine production work.') +
                feature('fa-display', model.control, model.control === 'Touch-screen control' ? 'Provides accessible operation and repeatable adjustment of production parameters.' : 'Provides microelectronic keyboard operation for the printing cycle.') +
                feature('fa-sliders', 'Adjustable print setup', 'The series supports independent pad stroke and speed adjustment, plus adjustable cliché positioning.') +
            '</div></div></section>' +
            '<section class="printable-products" aria-labelledby="products-title"><div class="section-header"><h2 id="products-title">Typical Applications</h2><p>Winon specifies this two-color ink-cup series for electronic products, home appliances, hardware, plastics, toys, stationery, and other products that require clear registered graphics.</p></div><div class="products-grid">' + applications() + '</div></section>' +
            '<section class="machine-drawing" aria-labelledby="drawing-title"><div class="section-header"><h2 id="drawing-title">Technical Drawing</h2><p>Use the drawing as an installation and layout reference. Confirm final space, utilities, tooling, and production requirements with Printway before installation.</p></div><div class="drawing-container"><img src="' + base + 'technical-drawing.jpg" alt="Technical drawing of ' + escapeHtml(name) + ' two-color ink-cup pad printing machine"></div><div class="drawing-info"><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i></div><h3>Machine Dimensions</h3><p>Reference the drawing when planning the machine footprint and work area.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-industry" aria-hidden="true"></i></div><h3>Production Layout</h3><p>Plan the operator position, fixture access, and surrounding production flow.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i></div><h3>Installation Review</h3><p>Confirm electrical, compressed-air, tooling, and safety requirements before installation.</p></div></div></section>' +
            '<section class="machine-contact-box" aria-labelledby="contact-title"><h2 id="contact-title">Interested in the ' + escapeHtml(name) + '?</h2><p>Contact Printway Marketing &amp; Services for pricing, machine configuration, product testing, spare parts, consumables, and technical support.</p><a href="' + quote + '" class="quote-button">Request a Quote</a></section>';

        const floatingQuote = document.querySelector('.quote-floating');
        if (floatingQuote) {
            floatingQuote.href = quote;
        }
    };

    const currentFile = window.location.pathname.split('/').pop().toLowerCase();
    const currentModel = models.find(function (model) {
        return model.file.toLowerCase() === currentFile;
    });

    if (currentModel) {
        renderDetail(currentModel);
    } else {
        renderCatalogue();
    }
}());

/* ==========================================
   TWO-COLOR INKWELL CATALOGUE AND DETAIL PAGES
========================================== */

(function () {
    const definitions = [
        ['WN-121AS', 'wn-121AS.html', 'wn-121AS', 'Compact format', 'Small components with two-color graphics', 'Compact two-color model for small product marks, logos, and graphics.'],
        ['WN-121P', 'wn-121P.html', 'wn-121P', 'Compact format', 'Two-color work on compact products', 'Compact two-color printer for products that need clear, registered artwork.'],
        ['WN-123', 'wn-123.html', 'wn-123', 'Standard format', 'General two-color product marking', 'Standard two-color open-inkwell model for logos, symbols, and product identifiers.'],
        ['WN-123A', 'wn-123A.html', 'wn-123A', 'Wide format', 'Broader two-color graphics on production parts', 'Wide-format two-color model for production parts with more detailed graphics.'],
        ['WN-123P', 'wn-123P.html', 'wn-123P', 'Extended format', 'Extended two-color logos and markings', 'Extended-format two-color model for larger graphics, panels, and product marks.'],
        ['WN-129', 'wn-129.html', 'wn-129', 'Large format', 'Larger components and two-color graphics', 'Large-format two-color printer for wider graphics and larger industrial components.'],
        ['WN-131P', 'wn-131P.html', 'wn-131P', 'Long format', 'Long, registered two-color print layouts', 'Long-format two-color model for extended graphics and product-identification layouts.'],
['WN-139', 'wn-139.html', 'wn-139', 'Large format', 'Larger production parts and brand graphics', 'Large-format two-color printer for industrial production graphics and product marking.'],
        ['WN-162', 'wn-162.html', 'wn-162', 'Large format', 'Large components with two-color graphics', 'Large-format two-color printer for registered graphics, logos, and marks on production parts.'],
        ['WN-131', 'wn-131.html', 'wn-131', 'Large format', 'Larger production components and two-color branding', 'Large-format two-color open-inkwell model for registered graphics on larger production components.'],
        ['WN-160AL/2', 'wn-160AL2.html', 'wn-160AL2', 'Standard format', 'Two-color graphics on production components', 'Standard two-color open-inkwell configuration for registered graphics and product marking on production components.']
    ];

    const models = definitions.map(function (item) {
        return { id: item[0], file: item[1], asset: item[2], format: item[3], focus: item[4], catalog: item[5] };
    });

    const escapeHtml = function (value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character];
        });
    };

    const imageBase = function (model) {
        return '../images/machines/pad-printing/' + model.asset + '/';
    };

    const feature = function (icon, title, text) {
        return '<div class="feature-box"><div class="feature-icon"><i class="fa-solid ' + icon + '" aria-hidden="true"></i></div><div><h3>' + escapeHtml(title) + '</h3><p>' + escapeHtml(text) + '</p></div></div>';
    };

    const formatFeature = function (model) {
        if (model.format.indexOf('Long') !== -1) {
            return ['fa-arrows-left-right', 'Long-format capability', 'Suited to products that need longer registered graphics or identifiers.'];
        }
        if (/(Extended|Large|Wide)/.test(model.format)) {
            return ['fa-expand', 'Extended graphic format', 'A strong option when the product calls for a broader two-color print area.'];
        }
        return ['fa-crosshairs', 'Compact precision', 'Well suited to clear, registered two-color logos, symbols, and product markings.'];
    };

    const applications = function () {
        const items = [
            ['fa-cube', 'Plastic Components', 'Housings, covers, buttons, switches, and molded plastic parts.'],
            ['fa-microchip', 'Electronic Products', 'Control panels, remote controls, keyboards, and accessories.'],
            ['fa-bottle-droplet', 'Packaging & Containers', 'Bottles, caps, containers, and branded packaging components.'],
            ['fa-gift', 'Promotional Items', 'Pens, keychains, USB drives, and other customised items.'],
            ['fa-car', 'Automotive Parts', 'Knobs, switches, trim pieces, and interior components.'],
            ['fa-gears', 'Industrial Components', 'Parts that require registered two-color logos, symbols, or identifiers.']
        ];

        return items.map(function (item) {
            return '<div class="product-card"><div class="product-icon"><i class="fa-solid ' + item[0] + '" aria-hidden="true"></i></div><h3>' + item[1] + '</h3><p>' + item[2] + '</p></div>';
        }).join('');
    };

    const renderCatalogue = function () {
        const grid = document.getElementById('two-color-inkwell-grid');
        if (!grid) {
            return;
        }

        grid.innerHTML = models.map(function (model) {
            return '<article class="machine-product-card"><img src="' + imageBase(model) + 'main-photo.jpg" alt="Winon ' + escapeHtml(model.id) + ' two-color pad printing machine"><div class="machine-product-content"><span>2 Color &middot; Open inkwell</span><h2>' + escapeHtml(model.id) + '</h2><p>' + escapeHtml(model.catalog) + '</p><a href="' + model.file + '" class="machine-btn">View details <i class="fas fa-arrow-right" aria-hidden="true"></i></a></div></article>';
        }).join('');
    };

    const renderDetail = function (model) {
        const main = document.querySelector('main');
        if (!main) {
            return;
        }

        const name = 'Winon ' + model.id;
        const base = imageBase(model);
        const type = 'Automatic two-color open-inkwell pad printing machine';
        const quote = '../index.html?model=' + encodeURIComponent(name) + '#contact';
        const sizeFeature = formatFeature(model);

        document.title = name + ' | Two-Color Pad Printing Machine | Printway';
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', name + ' automatic two-color open-inkwell pad printing machine from Printway Marketing & Services.');
        }

        main.innerHTML =
            '<section class="machine-hero" aria-labelledby="machine-title">' +
                '<div class="machine-main-photo"><img src="' + base + 'main-photo.jpg" alt="' + escapeHtml(name) + ' two-color pad printing machine"></div>' +
                '<div class="machine-information"><p class="machine-eyebrow">TWO-COLOR INKWELL PAD PRINTING</p><h1 id="machine-title">' + escapeHtml(name) + '</h1><h2>' + type + '</h2><p class="machine-brand">Winon Industrial Co., Ltd. &mdash; Hong Kong</p><p>' + escapeHtml(model.catalog) + '</p><p>Two-color print results and registration should be confirmed with a sample product, inks, pads, plates, and fixture selection.</p><h3>Key Details</h3><table class="machine-spec-table"><tbody>' +
                    '<tr><th scope="row">Model</th><td>' + escapeHtml(model.id) + '</td></tr><tr><th scope="row">Printing Colors</th><td>2 Colors</td></tr><tr><th scope="row">Ink System</th><td>Open inkwell</td></tr><tr><th scope="row">Print Format</th><td>' + escapeHtml(model.format) + '</td></tr><tr><th scope="row">Production System</th><td>Pneumatic production cycle</td></tr><tr><th scope="row">Product Focus</th><td>' + escapeHtml(model.focus) + '</td></tr>' +
                    '</tbody></table><p class="machine-spec-note">Contact Printway for the full technical specification, available options, and a production suitability review.</p></div></section>' +
            '<section class="machine-feature-section" aria-labelledby="features-title"><div class="feature-image"><img src="' + base + 'close-up.jpg" alt="Close-up of ' + escapeHtml(name) + ' two-color pad printing machine"></div><div class="feature-content"><p class="machine-eyebrow">BUILT FOR TWO-COLOR WORK</p><h2 id="features-title">Production Features</h2><div class="feature-list">' +
                feature('fa-layer-group', 'Two-color printing', 'Designed for registered two-color logos, graphics, and product-identification workflows.') +
                feature('fa-palette', 'Open inkwell system', 'Provides direct access for ink and doctor-blade setup during production.') +
                feature(sizeFeature[0], sizeFeature[1], sizeFeature[2]) +
                feature('fa-screwdriver-wrench', 'Configurable setup', 'Pads, plates, fixtures, inks, and surface preparation are selected for the product and finish.') +
            '</div></div></section>' +
            '<section class="printable-products" aria-labelledby="products-title"><div class="section-header"><h2 id="products-title">Typical Applications</h2><p>The ' + escapeHtml(name) + ' can be specified for a broad range of two-color products. Print results depend on the surface, ink system, artwork, and production setup.</p></div><div class="products-grid">' + applications() + '</div></section>' +
            '<section class="machine-drawing" aria-labelledby="drawing-title"><div class="section-header"><h2 id="drawing-title">Technical Drawing</h2><p>Use the drawing as an installation and layout reference. Confirm final space, utilities, and production requirements with Printway before installation.</p></div><div class="drawing-container"><img src="' + base + 'technical-drawing.jpg" alt="Technical drawing of ' + escapeHtml(name) + ' two-color pad printing machine"></div><div class="drawing-info"><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i></div><h3>Machine Dimensions</h3><p>Reference the drawing when planning the machine footprint and work area.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-industry" aria-hidden="true"></i></div><h3>Production Layout</h3><p>Plan the operator position, fixture access, and surrounding production flow.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i></div><h3>Installation Review</h3><p>Confirm electrical, compressed-air, tooling, and safety requirements before installation.</p></div></div></section>' +
            '<section class="machine-contact-box" aria-labelledby="contact-title"><h2 id="contact-title">Interested in the ' + escapeHtml(name) + '?</h2><p>Contact Printway Marketing &amp; Services for pricing, machine configuration, product testing, spare parts, consumables, and technical support.</p><a href="' + quote + '" class="quote-button">Request a Quote</a></section>';

        const floatingQuote = document.querySelector('.quote-floating');
        if (floatingQuote) {
            floatingQuote.href = quote;
        }
    };

    const currentFile = window.location.pathname.split('/').pop().toLowerCase();
    const currentModel = models.find(function (model) {
        return model.file.toLowerCase() === currentFile;
    });

    if (currentModel) {
        renderDetail(currentModel);
    } else {
        renderCatalogue();
    }
}());

/* ==========================================
   SCREEN PRINTING - ROUND PRINTING SERIES
========================================== */

(function () {
    const seriesApplications = [
        ['fa-mug-hot', 'Cups & Mugs', 'Round and oval cups, mugs, and drinkware printed on curved surfaces.'],
        ['fa-bottle-droplet', 'Bottles & Containers', 'Bottles and containers with cylindrical or oval bodies.'],
        ['fa-cube', 'Tubes & Buckets', 'Cylindrical tubes, buckets, and similar round containers.'],
        ['fa-industry', 'Cans & Metal Containers', 'Cans and metallic containers that require product graphics.'],
        ['fa-microchip', 'Key-Press Electronics', 'Computers, mobile phones, panels, telephones, and game players.'],
        ['fa-gift', 'Hardware & Plastic Accessories', 'Logos, toys, and commodity parts on hardware or plastic products.']
    ];

    const seriesFeatures = [
        ['fa-display', 'Microcomputer control', 'Multi-function microcomputer control for versatile, easy operation.'],
        ['fa-gears', 'World-renowned pneumatic components', 'Powerful, durable, and solid operation from globally recognised pneumatic components.'],
        ['fa-sliders', 'Adjustable worktable and screen arm', 'Fine adjustment simplifies commissioning, screen setup, and easy plate changes.'],
        ['fa-crosshairs', 'Precise printing positioning', 'Gear-and-rack conveyance with a suitable fixture ensures accurate positioning and stable printing.']
    ];

    const definitions = [
        {
            id: 'WSC-260A',
            file: 'wsc-260A.html',
            asset: 'wsc-260A',
            variant: 'Round Printing Series',
            type: 'Automatic round-surface screen printing machine',
            catalog: 'Compact round-surface screen printer for cups, bottles, tubes, cans, and other round and oval products.',
            description: 'Winon lists the WSC-260A as a curved-surface screen printer for round, oval, and cylindrical workpieces. Microcomputer control, adjustable worktable and screen arm, precise gear-and-rack positioning, and a special shock absorber support stable, repeatable curved-surface printing on cups, bottles, tubes, buckets, and cans.',
            specs: [['Max. screen plate size', '350 × 450 mm'], ['Max. printing area', '80 / 200 × 250 mm'], ['Production speed', '1,500 cycles/hour'], ['Worktable size', '350 × 650 mm'], ['Electric power', '110 V or 220 V, 50/60 Hz, 20 W'], ['External dimensions', '690 × 630 × 1,660 mm'], ['Net weight', '145 kg']],
            features: seriesFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: false,
            hasCloseUp: true
        },
        {
            id: 'WSC-350A',
            file: 'wsc-350A.html',
            asset: 'wsc-350A',
            variant: 'Round Printing Series',
            type: 'Automatic round-surface screen printing machine',
            catalog: 'Mid-size round-surface screen printer for cups, bottles, tubes, cans, and round or oval containers.',
            description: 'Winon lists the WSC-350A as a curved-surface screen printer for columnar, oval, bottle, tube, and can surfaces. Its adjustable worktable and screen arm make commissioning easy, while gear-and-rack conveyance and a special shock absorber deliver precise, stable printing.',
            specs: [['Max. screen plate size', '350 × 550 mm'], ['Max. printing area', '110 / 200 × 345 mm'], ['Production speed', '1,300 cycles/hour'], ['Electric power', '110 V or 220 V, 50/60 Hz, 20 W'], ['External dimensions', '790 × 700 × 1,680 mm'], ['Net weight', '175 kg']],
            features: seriesFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-360A',
            file: 'wsc-360A.html',
            asset: 'wsc-360A',
            variant: 'Round Printing Series',
            type: 'Automatic round-surface screen printing machine',
            catalog: 'Round-surface screen printer for cylindrical and oval cups, bottles, tubes, and cans with a compact footprint.',
            description: 'Winon lists the WSC-360A as a compact curved-surface screen printer for cup, bottle, tube, and can printing. Microcomputer control, micro-adjustable setup, and precise gear-and-rack positioning provide dependable round-surface printing in a space-saving frame.',
            specs: [['Max. screen plate size', '350 × 550 mm'], ['Max. printing area', '110 / 200 × 345 mm'], ['Production speed', '1,300 cycles/hour'], ['Electric power', '110 V or 220 V, 50/60 Hz, 20 W'], ['External dimensions', '870 × 760 × 1,360 mm'], ['Net weight', '175 kg']],
            features: seriesFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-500',
            file: 'wsc-500.html',
            asset: 'wsc-500',
            variant: 'Round Printing Series',
            type: 'Automatic round-surface screen printing machine',
            catalog: 'Larger round-surface screen printer for wider product graphics on round, oval, and cylindrical containers.',
            description: 'Winon lists the WSC-500 as a curved-surface screen printer with a larger screen plate and printing area for wider round-product graphics. Gear-and-rack conveyance with a suitable fixture and the special shock absorber keep printing accurate and stable.',
            specs: [['Max. screen plate size', '400 × 700 mm'], ['Max. printing area', '150 / 250 × 470 mm'], ['Printing thickness', '200 mm'], ['Production speed', '1,000 cycles/hour'], ['Worktable size', '350 × 550 mm'], ['Electric power', '110 V or 220 V, 50/60 Hz, 20 W'], ['External dimensions', '1,060 × 1,100 × 1,680 mm'], ['Net weight', '210 kg']],
            features: seriesFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-650A',
            file: 'wsc-650A.html',
            asset: 'wsc-650A',
            variant: 'Round Printing Series',
            type: 'Automatic round-surface screen printing machine',
            catalog: 'Heavy-duty round-surface screen printer for long cylindrical, conical, and elliptical product surfaces.',
            description: 'Winon describes the WSC-650A as a micro-electronic keyboard-controlled curved-surface screen printer with world-renowned pneumatic components, a fine-tuning workbench and screen arm, and gear-rack synchronous transmission for accurate positioning printing across cylindrical, round-conical, and elliptical surfaces.',
            specs: [['Max. screen plate size', '500 × 900 mm'], ['Max. printing area', '205 / 300 × 645 mm'], ['Production speed', '600 cycles/hour'], ['Electric power', '110 V or 220 V, 50/60 Hz, 20 W'], ['External dimensions', '1,200 × 950 × 1,520 mm'], ['Net weight', '300 kg']],
            features: [
                ['fa-keyboard', 'Micro-electronic keyboard control', 'Versatile operation interface that is easy to operate.'],
                ['fa-gears', 'World-renowned pneumatic components', 'Powerful, durable operation from globally recognised pneumatic components.'],
                ['fa-sliders', 'Fine-tuning function', 'Workbench and screen-arm fine-tuning for quick, easy setup and plate changes.'],
                ['fa-sync', 'Gear-rack synchronous transmission', 'Synchronous gear-and-rack transmission with fixtures ensures accurate positioning printing.']
            ],
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-650AS',
            file: 'wsc-650AS.html',
            asset: 'wsc-650AS',
            variant: 'Round Printing Series',
            type: 'Automatic round-surface screen printing machine',
            catalog: 'Extra-large round-surface screen printer with a 960 mm print length for very long cylindrical products.',
            description: 'Winon lists the WSC-650AS as a curved-surface screen printer with a 960 mm printing area for extra-long cylindrical and oval product graphics. Its heavy frame, adjustable setup, and stable shock-absorbed printing suit continuous round-surface production.',
            specs: [['Max. screen plate size', '900 × 1,000 mm'], ['Max. printing area', '320 / 480 × 960 mm'], ['Production speed', '400 cycles/hour'], ['Electric power', '110 V or 220 V, 50/60 Hz, 80 W'], ['External dimensions', '1,200 × 2,030 × 1,800 mm'], ['Net weight', '300 kg']],
            features: seriesFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-1200A',
            file: 'wsc-1200A.html',
            asset: 'wsc-1200A',
            variant: 'Round Printing Series',
            type: 'Automatic round-surface screen printing machine',
            catalog: 'Extended round-surface screen printer with the largest print length for very long round and oval products.',
            description: 'Winon lists the WSC-1200A as an extended curved-surface screen printer for the longest round and oval product graphics, with a screen plate size of 500 × 1,500 mm and a printing area of up to 1,195 mm. Stable gear-and-rack positioning and shock-absorbed print motion keep output consistent.',
            specs: [['Max. screen plate size', '500 × 1,500 mm'], ['Max. printing area', '380 / 300 × 1,195 mm'], ['Production speed', '500 cycles/hour'], ['Electric power', '110 V or 220 V, 50/60 Hz, 80 W'], ['External dimensions', '3,220 × 1,250 × 1,680 mm'], ['Net weight', '380 kg']],
            features: seriesFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        }
    ];

    const escapeHtml = function (value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character];
        });
    };

    const imageBase = function (model) {
        return '../images/machines/screen/' + model.asset + '/';
    };

    const feature = function (icon, title, text) {
        return '<div class="feature-box"><div class="feature-icon"><i class="fa-solid ' + icon + '" aria-hidden="true"></i></div><div><h3>' + escapeHtml(title) + '</h3><p>' + escapeHtml(text) + '</p></div></div>';
    };

    const renderApplications = function (model) {
        const intro = 'Winon applies this series to printing on cups, bottles, tubes, buckets, and cans, and to key-press electronic components, hardware, and plastic accessories. Special designs are available for specific customer requirements.';
        const cards = model.applications.map(function (item) {
            return '<div class="product-card"><div class="product-icon"><i class="fa-solid ' + item[0] + '" aria-hidden="true"></i></div><h3>' + escapeHtml(item[1]) + '</h3><p>' + escapeHtml(item[2]) + '</p></div>';
        }).join('');

        if (!model.hasTechnicalDrawing) {
            const applicationCards = model.applications.map(function (item) {
                return '<article class="application-card"><div class="application-icon"><i class="fa-solid ' + item[0] + '" aria-hidden="true"></i></div><h3>' + escapeHtml(item[1]) + '</h3><p>' + escapeHtml(item[2]) + '</p></article>';
            }).join('');

            return '<section class="machine-applications" aria-labelledby="applications-title"><div class="section-header"><h2 id="applications-title">Application Areas</h2><p>This model does not have a supplied technical drawing, so the page shows application areas instead. ' + escapeHtml(intro) + '</p></div><div class="application-grid">' + applicationCards + '</div></section>';
        }

        return '<section class="printable-products" aria-labelledby="products-title"><div class="section-header"><h2 id="products-title">Typical Applications</h2><p>' + escapeHtml(intro) + '</p></div><div class="products-grid">' + cards + '</div></section>';
    };

    const renderDrawing = function (model) {
        const base = imageBase(model);
        const name = 'Winon ' + model.id;

        return '<section class="machine-drawing" aria-labelledby="drawing-title"><div class="section-header"><h2 id="drawing-title">Technical Drawing</h2><p>Use the drawing as an installation and layout reference. Confirm final space, utilities, tooling, and production requirements with Printway before installation.</p></div><div class="drawing-container"><img src="' + base + 'technical-drawing.jpg" alt="Technical drawing of ' + escapeHtml(name) + ' screen printing machine"></div><div class="drawing-info"><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i></div><h3>Machine Dimensions</h3><p>Reference the drawing when planning the machine footprint and work area.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-industry" aria-hidden="true"></i></div><h3>Production Layout</h3><p>Plan the operator position, fixture access, and surrounding production flow.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i></div><h3>Installation Review</h3><p>Confirm electrical, compressed-air, tooling, and safety requirements before installation.</p></div></div></section>';
    };

    const renderCatalogue = function () {
        const grid = document.getElementById('round-printing-grid');
        if (!grid) {
            return;
        }

        grid.innerHTML = definitions.map(function (model) {
            return '<article class="machine-product-card"><img src="' + imageBase(model) + 'main-photo.jpg" alt="Winon ' + escapeHtml(model.id) + ' round-surface screen printing machine"><div class="machine-product-content"><span>' + escapeHtml(model.variant) + '</span><h2>' + escapeHtml(model.id) + '</h2><p>' + escapeHtml(model.catalog) + '</p><a href="' + model.file + '" class="machine-btn">View details <i class="fas fa-arrow-right" aria-hidden="true"></i></a></div></article>';
        }).join('');
    };

    const renderDetail = function (model) {
        const main = document.querySelector('main');
        if (!main) {
            return;
        }

        const name = 'Winon ' + model.id;
        const base = imageBase(model);
        const quote = '../index.html?model=' + encodeURIComponent(name) + '#contact';
        const details = [['Model', model.id], ['Series', model.variant]].concat(model.specs).map(function (item) {
            return '<tr><th scope="row">' + escapeHtml(item[0]) + '</th><td>' + escapeHtml(item[1]) + '</td></tr>';
        }).join('');
        const featurePhoto = model.hasCloseUp ? base + 'close-up.jpg' : base + 'main-photo.jpg';
        const featurePhotoAlt = model.hasCloseUp ? 'Close-up of ' + name + ' screen printing machine' : name + ' screen printing machine';
        const features = model.features.map(function (item) {
            return feature(item[0], item[1], item[2]);
        }).join('');

        document.title = name + ' | ' + model.variant + ' | Printway';
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', name + ' ' + model.type.toLowerCase() + ' from Printway Marketing & Services.');
        }

        main.innerHTML =
            '<section class="machine-hero" aria-labelledby="machine-title"><div class="machine-main-photo"><img src="' + base + 'main-photo.jpg" alt="' + escapeHtml(name) + ' screen printing machine"></div><div class="machine-information"><p class="machine-eyebrow">SCREEN PRINTING MACHINE</p><h1 id="machine-title">' + escapeHtml(name) + '</h1><h2>' + escapeHtml(model.type) + '</h2><p class="machine-brand">Winon Industrial Co., Ltd. &mdash; Hong Kong</p><p>' + escapeHtml(model.description) + '</p><h3>Technical Details</h3><table class="machine-spec-table"><tbody>' + details + '</tbody></table><p class="machine-spec-note">Specifications are based on Winon’s published product listing. Confirm available options, tooling, fixtures, and final production suitability with Printway.</p></div></section>' +
            '<section class="machine-feature-section" aria-labelledby="features-title"><div class="feature-image"><img src="' + featurePhoto + '" alt="' + escapeHtml(featurePhotoAlt) + '"></div><div class="feature-content"><p class="machine-eyebrow">BUILT FOR ROUND PRINTING</p><h2 id="features-title">Production Features</h2><div class="feature-list">' + features + '</div></div></section>' +
            renderApplications(model) +
            (model.hasTechnicalDrawing ? renderDrawing(model) : '') +
            '<section class="machine-contact-box" aria-labelledby="contact-title"><h2 id="contact-title">Interested in the ' + escapeHtml(name) + '?</h2><p>Contact Printway Marketing &amp; Services for pricing, machine configuration, product testing, spare parts, consumables, and technical support.</p><a href="' + quote + '" class="quote-button">Request a Quote</a></section>';

        const floatingQuote = document.querySelector('.quote-floating');
        if (floatingQuote) {
            floatingQuote.href = quote;
        }
    };

    const currentFile = window.location.pathname.split('/').pop().toLowerCase();
    const currentModel = definitions.find(function (model) {
        return model.file.toLowerCase() === currentFile;
    });

    if (currentModel) {
        renderDetail(currentModel);
    } else {
        renderCatalogue();
    }
}());

/* ==========================================
   SCREEN PRINTING - FLAT PRINTING SERIES
========================================== */

(function () {
    const seriesApplications = [
        ['fa-car', 'Automotive Parts', 'Motormeters, tanks, window glass, and other automotive components.'],
        ['fa-microchip', 'Electronic Products', 'Keypads, silicon keys, phone windows, membrane keys, and circuit boards.'],
        ['fa-tv', 'Electronic Appliances', 'Nameplates, dial scales, fireplace glass, appliance housings, and glass panels.'],
        ['fa-tag', 'Advertising & Publishing', 'Posters, labels, road markers, meal cards, and credit cards.'],
        ['fa-shirt', 'Textiles & Clothing', 'T-shirts, flags, knit goods, and similar flat fabric products.'],
        ['fa-gift', 'Gifts & Stationery', 'Toys, stationery, handicrafts, and transfer paper.']
    ];

    const automationApplications = [
        ['fa-pen-ruler', 'Stationery & Daily Necessities', 'Stationery, daily necessities, and daily-use products.'],
        ['fa-gift', 'Gifts & Promotional Items', 'Gifts, toys, and promotional colour-box items.'],
        ['fa-microchip', 'Electronics & Appliances', 'Product graphics and markings on flat electronic components.'],
        ['fa-box', 'Colour Boxes', 'Paper colour-box and packaging printing applications.']
    ];

    const standardFeatures = [
        ['fa-arrows-up-down', 'Screen plate up/down', 'Light and compact arrangement with direct screen plate up/down motion.'],
        ['fa-display', 'Multi-function microcomputer control', 'Versatile, easy operation with multi-function microcomputer control.'],
        ['fa-gears', 'World-renowned pneumatic components', 'Powerful, durable, and solid operation from globally recognised pneumatic components.'],
        ['fa-crosshairs', 'Precise printing positioning', 'Worktable and screen-arm micro adjustment, gear-and-rack conveyance, and a suitable fixture ensure accurate, stable printing.']
    ];

    const servoFeatures = [
        ['fa-bolt', 'Full-servo motor drive', 'Intelligent full-servo motor-driven operation for smooth, accurate printing.'],
        ['fa-gauge-high', 'Fully digital control', 'Printing speed and travel can be completely set and controlled digitally.'],
        ['fa-shield-halved', 'Built-in security devices', 'Safety devices help protect stable, reliable production.'],
        ['fa-sliders', 'Easy adjustment', 'Smooth operation and simple adjustment support quick setup and changeovers.']
    ];

    const automationFeatures = [
        ['fa-conveyor-belt', 'Stand-up auto conveyor', 'Automatic feeding and discharge with auto-detection for continuous production.'],
        ['fa-display', 'Digital touch-screen control', 'Easy operation with digital control and automatic screen-frame positioning and changing.'],
        ['fa-sliders', 'Quick specification changeover', 'Automatic changing functions for different specification items and tooling.'],
        ['fa-triangle-exclamation', 'Fault alarming function', 'Built-in fault alarming helps protect smooth, continuous operation.']
    ];

    const definitions = [
        {
            id: 'WSC-260B',
            file: 'wsc-260B.html',
            asset: 'wsc-260B',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Compact flat-screen printer for smaller panels, nameplates, glass, cards, plastics, and textile workpieces.',
            description: 'Winon lists the WSC-260B as a flat-screen printer with screen plate up/down motion, multi-function microcomputer control, world-renowned pneumatic components, a micro-adjustable worktable and screen arm, gear-and-rack conveyance with a suitable fixture for precise positioning, and a special shock absorber for stable performance. It suits flat panels, nameplates, glass, cards, plastics, and textile printing in electronics, decoration, publishing, and related industries.',
            specs: [['Max. screen plate size', '350 × 450 mm'], ['Max. printing area', '200 × 260 mm'], ['Printing thickness', '100 mm'], ['Printing speed', '1,400 cycles/hour'], ['Worktable size', '280 × 380 mm'], ['Power specifications', '110 V or 220 V, 50/60 Hz'], ['Power consumption', '20 W'], ['External dimensions', '690 × 630 × 1,660 mm'], ['Net weight', '160 kg']],
            features: standardFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-350B',
            file: 'wsc-350B.html',
            asset: 'wsc-350B',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Standard flat-screen printer for panels, nameplates, glass, electronics, textiles, and flat components.',
            description: 'Winon lists the WSC-350B as a flat-screen printer for standard-size flat workpieces. It offers a micro-adjustable worktable and screen arm, gear-and-rack conveyance with a suitable fixture for precise positioning, a special shock absorber for stable performance, and a 250 × 350 mm printing area for panels, nameplates, glass, plastics, cards, and textiles.',
            specs: [['Max. screen plate size', '400 × 500 mm'], ['Max. printing area', '250 × 350 mm'], ['Printing thickness', '80 mm'], ['Printing speed', '1,200 cycles/hour'], ['Worktable size', '300 × 450 mm'], ['Power specifications', '110 V or 220 V, 50/60 Hz'], ['Power consumption', '20 W'], ['External dimensions', '790 × 700 × 1,680 mm'], ['Net weight', '180 kg']],
            features: standardFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-350BE',
            file: 'wsc-350BE.html',
            asset: 'wsc-350BE',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Extended-screen flat printer for wider flat-surface graphics on panels, glass, and printed components.',
            description: 'Winon lists the WSC-350BE as a flat-screen screen printer with an extended 400 × 550 mm screen plate and a 250 × 350 mm printing area. Microcomputer control, a micro-adjustable worktable and screen arm, gear-and-rack conveyance, and a special shock absorber deliver accurate, stable flat-surface printing.',
            specs: [['Max. screen plate size', '400 × 550 mm'], ['Max. printing area', '250 × 350 mm'], ['Printing thickness', '80 mm'], ['Printing speed', '1,200 cycles/hour'], ['Worktable size', '300 × 450 mm'], ['Power specifications', '110 V or 220 V, 50/60 Hz'], ['Power consumption', '20 W'], ['External dimensions', '790 × 660 × 1,680 mm'], ['Net weight', '185 kg']],
            features: standardFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-350BR/4',
            file: 'wsc-350BR4.html',
            asset: 'wsc-350BR4',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Compact flat-screen printer with a powered print cycle for smaller flat components and repeat marking.',
            description: 'Winon lists the WSC-350BR/4 as a flat-screen screen printer with a compact 120 × 200 mm printing area and a powered microcomputer-controlled print cycle. Its adjustable worktable and screen arm, gear-and-rack positioning, and shock-absorbed print motion suit smaller flat components and repeat product marking.',
            specs: [['Max. screen plate size', '300 × 400 mm'], ['Max. printing area', '120 × 200 mm'], ['Printing thickness', '80 mm'], ['Printing speed', '1,200 cycles/hour'], ['Power specifications', '110 V or 220 V, 50/60 Hz'], ['Power consumption', '800 W'], ['External dimensions', '1,050 × 810 × 1,680 mm'], ['Net weight', '240 kg']],
            features: standardFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-350FB',
            file: 'wsc-350FB.html',
            asset: 'wsc-350FB',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Flat-screen printer with a 300 mm print-thickness capacity for taller flat workpieces.',
            description: 'Winon lists the WSC-350FB as a flat-screen screen printer offering a 250 × 350 mm printing area and a 300 mm printing thickness for taller flat workpieces. Microcomputer control, a micro-adjustable worktable and screen arm, and shock-absorbed gear-and-rack print motion support stable, repeatable flat-surface production.',
            specs: [['Max. screen plate size', '400 × 550 mm'], ['Max. printing area', '250 × 350 mm'], ['Printing thickness', '300 mm'], ['Printing speed', '1,200 cycles/hour'], ['Worktable size', '300 × 450 mm'], ['Power specifications', '110 V or 220 V, 50/60 Hz'], ['Power consumption', '20 W'], ['External dimensions', '910 × 700 × 1,700 mm'], ['Net weight', '180 kg']],
            features: standardFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-350FBE',
            file: 'wsc-350FBE.html',
            asset: 'wsc-350FBE',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Flat-screen printer with a taller 300 mm thickness rating and extended screen plate for raised workpieces.',
            description: 'Winon lists the WSC-350FBE as a flat-screen screen printer with an extended 400 × 550 mm screen plate, a 250 × 350 mm printing area, and a 300 mm printing thickness for taller workpieces. Adjustable setup and stable shock-absorbed printing suit varied flat product requirements.',
            specs: [['Max. screen plate size', '400 × 550 mm'], ['Max. printing area', '250 × 350 mm'], ['Printing thickness', '300 mm'], ['Printing speed', '1,200 cycles/hour'], ['Worktable size', '300 × 450 mm'], ['Power specifications', '110 V or 220 V, 50/60 Hz'], ['Power consumption', '20 W'], ['External dimensions', '910 × 700 × 1,700 mm'], ['Net weight', '185 kg']],
            features: standardFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-500B',
            file: 'wsc-500B.html',
            asset: 'wsc-500B',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Larger flat-screen printer with a 300 × 500 mm print area for wider panels, glass, and product graphics.',
            description: 'Winon lists the WSC-500B as a flat-screen printer for wider flat workpieces, offering a 450 × 750 mm screen plate and a 300 × 500 mm printing area. Microcomputer control, an adjustable worktable and screen arm, gear-and-rack conveyance, and a special shock absorber support accurate, stable flat printing.',
            specs: [['Max. screen plate size', '450 × 750 mm'], ['Max. printing area', '300 × 500 mm'], ['Printing thickness', '80 mm'], ['Printing speed', '900 cycles/hour'], ['Worktable size', '350 × 550 mm'], ['Power specifications', '110 V or 220 V, 50/60 Hz'], ['Power consumption', '20 W'], ['External dimensions', '910 × 720 × 1,680 mm'], ['Net weight', '210 kg']],
            features: standardFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-500BE',
            file: 'wsc-500BE.html',
            asset: 'wsc-500BE',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Extended larger-format flat printer with a table-lifting structure and German-precision pneumatic drive.',
            description: 'Winon lists the WSC-500BE as a flat-screen printer with a table-lifting structure, optional spare parts, and German-quality precision pneumatic components that provide a powerful driving force. A special push system and shock absorber keep operation smooth, accurate, and efficient with a 300 × 500 mm printing area.',
            specs: [['Max. screen plate size', '450 × 750 mm'], ['Max. printing area', '300 × 500 mm'], ['Printing thickness', '80 mm'], ['Printing speed', '900 cycles/hour'], ['Worktable size', '350 × 550 mm'], ['Power specifications', '110 V or 220 V, 50/60 Hz'], ['Power consumption', '20 W'], ['External dimensions', '910 × 720 × 1,680 mm'], ['Net weight', '215 kg']],
            features: standardFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-600BS/1',
            file: 'wsc-600BS1.html',
            asset: 'wsc-600BS1',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Large flat-screen printer with a 300 × 600 mm print area for extended panels, glass, and flat products.',
            description: 'Winon lists the WSC-600BS/1 as a flat-screen printer with a 500 × 850 mm screen plate and a 300 × 600 mm printing area for longer flat workpieces. Microcomputer control, an adjustable worktable and screen arm, gear-and-rack positioning, and a special shock absorber deliver precise, stable printing.',
            specs: [['Max. screen plate size', '500 × 850 mm'], ['Max. printing area', '300 × 600 mm'], ['Printing thickness', '80 mm'], ['Printing speed', '900 cycles/hour'], ['Worktable size', '350 × 650 mm'], ['Power specifications', '110 V or 220 V, 50/60 Hz'], ['Power consumption', '20 W'], ['External dimensions', '1,050 × 750 × 1,680 mm'], ['Net weight', '245 kg']],
            features: standardFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-600BD',
            file: 'wsc-600BD.html',
            asset: 'wsc-600BD',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Full-servo flat-screen printer for large-area printing with digital speed and travel control.',
            description: 'Winon lists the WSC-600BD as an intelligent full-servo motor-driven flat-screen printer for large-area screen printing. It combines smooth operation, easy adjustment, and built-in security devices, with printing speed and travel fully controlled digitally across a 400 × 600 mm printing area.',
            specs: [['Max. screen plate size', '600 × 850 mm'], ['Max. printing area', '400 × 600 mm'], ['Printing thickness', '80 mm'], ['Printing speed', '600 cycles/hour'], ['Worktable size', '500 × 700 mm'], ['Power specifications', '110 V or 220 V, 50/60 Hz'], ['Power consumption', '1,500 W'], ['External dimensions', '1,240 × 1,100 × 1,760 mm'], ['Net weight', '420 kg']],
            features: servoFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-600BM',
            file: 'wsc-600BM.html',
            asset: 'wsc-600BM',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Flat-screen printer with a long 1,000 mm screen plate for extended flat-surface graphics and production runs.',
            description: 'Winon lists the WSC-600BM as a flat-screen printer with a long 500 × 1,000 mm screen plate and a 300 × 600 mm printing area. Microcomputer control, an adjustable worktable and screen arm, gear-and-rack positioning, and a special shock absorber support stable extended flat-surface printing.',
            specs: [['Max. screen plate size', '500 × 1,000 mm'], ['Max. printing area', '300 × 600 mm'], ['Printing thickness', '80 mm'], ['Printing speed', '800 cycles/hour'], ['Worktable size', '400 × 600 mm'], ['Power specifications', '110 V or 220 V, 50/60 Hz'], ['Power consumption', '270 W'], ['External dimensions', '1,100 × 900 × 1,800 mm'], ['Net weight', '280 kg']],
            features: standardFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-600FBE',
            file: 'wsc-600FBE.html',
            asset: 'wsc-600FBE',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Full-servo flat-screen printer with a 400 mm print-thickness rating for large, taller flat workpieces.',
            description: 'Winon lists the WSC-600FBE as an intelligent full-servo motor-driven flat-screen printer for large-area printing. Smooth operation, easy adjustment, built-in security devices, and fully digital control of printing speed and travel support a 400 × 600 mm printing area with a generous 400 mm thickness clearance.',
            specs: [['Max. screen plate size', '600 × 850 mm'], ['Max. printing area', '400 × 600 mm'], ['Printing thickness', '400 mm'], ['Printing speed', '600 cycles/hour'], ['Worktable size', '450 × 650 mm'], ['Power specifications', '110 V or 220 V, 50/60 Hz'], ['Power consumption', '20 W'], ['External dimensions', '1,200 × 880 × 1,900 mm'], ['Net weight', '380 kg']],
            features: servoFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-700BE',
            file: 'wsc-700BE.html',
            asset: 'wsc-700BE',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Large-format full-servo flat-screen printer with a 500 × 700 mm print area for panels, glass, and large components.',
            description: 'Winon lists the WSC-700BE as an intelligent full-servo motor-driven flat-screen printer for large-area screen printing. A 750 × 1,000 mm screen plate and a 500 × 700 mm printing area combine with smooth operation, easy adjustment, security devices, and fully digital control of print speed and travel.',
            specs: [['Max. screen plate size', '750 × 1,000 mm'], ['Max. printing area', '500 × 700 mm'], ['Printing thickness', '100 mm'], ['Printing speed', '600 cycles/hour'], ['Worktable size', '600 × 800 mm'], ['Power specifications', '110 V or 220 V, 50/60 Hz'], ['Power consumption', '1,700 W'], ['External dimensions', '1,350 × 1,050 × 1,880 mm'], ['Net weight', '470 kg']],
            features: servoFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-800FB',
            file: 'wsc-800FB.html',
            asset: 'wsc-800FB',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Extra-large flat-screen printer with an 800 × 1,100 mm screen plate and a 500 × 800 mm print area.',
            description: 'Winon lists the WSC-800FB as an extra-large flat-screen printer with an 800 × 1,100 mm screen plate and a 500 × 800 mm printing area for large panels and glass. Microcomputer control, an adjustable worktable and screen arm, gear-and-rack positioning, and a special shock absorber deliver accurate, stable large-area printing.',
            specs: [['Max. screen plate size', '800 × 1,100 mm'], ['Max. printing area', '500 × 800 mm'], ['Printing thickness', '80 mm'], ['Printing speed', '600 cycles/hour'], ['Worktable size', '400 × 600 mm'], ['Power specifications', '110 V or 220 V, 50/60 Hz'], ['Power consumption', '270 W'], ['External dimensions', '1,380 × 1,650 × 1,980 mm'], ['Net weight', '550 kg']],
            features: standardFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-1000BE',
            file: 'wsc-1000BE.html',
            asset: 'wsc-1000BE',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Large-format full-servo flat-screen printer with a 600 × 1,000 mm print area for very large flat surfaces.',
            description: 'Winon lists the WSC-1000BE as an intelligent full-servo motor-driven flat-screen printer for large-area screen printing. An 850 × 1,300 mm screen plate and a 600 × 1,000 mm printing area combine with smooth operation, easy adjustment, security devices, and fully digital control of print speed and travel.',
            specs: [['Max. screen plate size', '850 × 1,300 mm'], ['Max. printing area', '600 × 1,000 mm'], ['Printing thickness', '100 mm'], ['Printing speed', '500 cycles/hour'], ['Worktable size', '800 × 1,200 mm'], ['Power specifications', '110 V or 220 V, 50/60 Hz'], ['Power consumption', '2,000 W'], ['External dimensions', '1,950 × 1,380 × 1,980 mm'], ['Net weight', '900 kg']],
            features: servoFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-1500BDE',
            file: 'wsc-1500BDE.html',
            asset: 'wsc-1500BDE',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Heavy-duty full-servo flat-screen printer with a 1,000 × 1,500 mm print area for the largest flat-surfaces.',
            description: 'Winon lists the WSC-1500BDE as an intelligent full-servo motor-driven flat-screen printer for the largest flat-surface screen printing. A 1,250 × 1,800 mm screen plate and a 1,000 × 1,500 mm printing area combine with smooth operation, easy adjustment, security devices, and fully digital control of printing speed and travel.',
            specs: [['Max. screen plate size', '1,250 × 1,800 mm'], ['Max. printing area', '1,000 × 1,500 mm'], ['Printing thickness', '200 mm'], ['Printing speed', '300 cycles/hour'], ['Worktable size', '1,100 × 1,600 mm'], ['Power specifications', '110 V or 220 V, 50/60 Hz'], ['Power consumption', '3,500 W'], ['External dimensions', '2,600 × 3,500 × 2,300 mm'], ['Net weight', '1,800 kg']],
            features: servoFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-5070',
            file: 'wsc-5070.html',
            asset: 'wsc-5070',
            variant: 'Flat Printing Series',
            type: 'Automatic flat-screen screen printing machine',
            catalog: 'Full-servo flat-screen printer with a 500 × 700 mm print area, digital control, and a 380 V supply.',
            description: 'Winon lists the WSC-5070 as an intelligent full-servo motor-driven flat-screen printer for large-area printing. A 750 × 1,100 mm screen plate and a 500 × 700 mm printing area combine with smooth operation, easy adjustment, security devices, and fully digital control of printing speed and travel, on a 380 V, 50 Hz supply.',
            specs: [['Max. screen plate size', '750 × 1,100 mm'], ['Max. printing area', '500 × 700 mm'], ['Printing thickness', '100 mm'], ['Printing speed', '800 cycles/hour'], ['Worktable size', '600 × 800 mm'], ['Power specifications', '380 V, 50 Hz'], ['Power consumption', '3,600 W'], ['External dimensions', '1,435 × 1,100 × 1,700 mm'], ['Net weight', '400 kg']],
            features: servoFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-6575-100L',
            file: 'wsc-6575-100L.html',
            asset: 'wsc-6575-100L',
            variant: 'Flat Printing Series',
            type: 'Automated flat-screen screen printing machine',
            catalog: 'Automated flat-screen printer with conveyor feeding and discharge for high-volume stationery, gift, and colour-box printing.',
            description: 'Winon specifies the WSC-6575-100L as a Winon automation flat-screen printer equipped with a stand-up auto conveyor and fully automatic feeding and discharge with auto-detection. Unified power transmission, digital control, automatic screen-frame positioning and changing, quick specification changeover, and a fault alarming function support high-speed, smooth, and easy operation for flat and round-surface workpieces.',
            specs: [['Printing colors', 'Single color'], ['Usage', 'Stationery, daily necessities, gifts, electronics, toys, and colour boxes'], ['Workpiece types', 'All kinds of plane and round surface workpieces'], ['Warranty', '1 year'], ['Certification', 'CE'], ['Power specifications', '110 V or 220 V, 50/60 Hz; 380 VAC, 50 Hz'], ['External dimensions', '4,000 × 3,100 × 1,800 mm'], ['Net weight', '2,450 kg']],
            features: automationFeatures,
            applications: automationApplications,
            hasTechnicalDrawing: false,
            hasCloseUp: false
        }
    ];

    const escapeHtml = function (value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character];
        });
    };

    const imageBase = function (model) {
        return '../images/machines/screen/' + model.asset + '/';
    };

    const feature = function (icon, title, text) {
        return '<div class="feature-box"><div class="feature-icon"><i class="fa-solid ' + icon + '" aria-hidden="true"></i></div><div><h3>' + escapeHtml(title) + '</h3><p>' + escapeHtml(text) + '</p></div></div>';
    };

    const renderApplications = function (model) {
        const intro = 'Winon applies this series to flat-surface printing on panels, nameplates, glass, cards, electronics, hardware, plastics, textiles, and gift and stationery products. Special designs are available for specific customer requirements.';

        if (!model.hasTechnicalDrawing) {
            const applicationCards = model.applications.map(function (item) {
                return '<article class="application-card"><div class="application-icon"><i class="fa-solid ' + item[0] + '" aria-hidden="true"></i></div><h3>' + escapeHtml(item[1]) + '</h3><p>' + escapeHtml(item[2]) + '</p></article>';
            }).join('');

            return '<section class="machine-applications" aria-labelledby="applications-title"><div class="section-header"><h2 id="applications-title">Application Areas</h2><p>This model does not have a supplied technical drawing, so the page shows application areas instead. ' + escapeHtml(intro) + '</p></div><div class="application-grid">' + applicationCards + '</div></section>';
        }

        const cards = model.applications.map(function (item) {
            return '<div class="product-card"><div class="product-icon"><i class="fa-solid ' + item[0] + '" aria-hidden="true"></i></div><h3>' + escapeHtml(item[1]) + '</h3><p>' + escapeHtml(item[2]) + '</p></div>';
        }).join('');

        return '<section class="printable-products" aria-labelledby="products-title"><div class="section-header"><h2 id="products-title">Typical Applications</h2><p>' + escapeHtml(intro) + '</p></div><div class="products-grid">' + cards + '</div></section>';
    };

    const renderDrawing = function (model) {
        const base = imageBase(model);
        const name = 'Winon ' + model.id;

        return '<section class="machine-drawing" aria-labelledby="drawing-title"><div class="section-header"><h2 id="drawing-title">Technical Drawing</h2><p>Use the drawing as an installation and layout reference. Confirm final space, utilities, tooling, and production requirements with Printway before installation.</p></div><div class="drawing-container"><img src="' + base + 'technical-drawing.jpg" alt="Technical drawing of ' + escapeHtml(name) + ' screen printing machine"></div><div class="drawing-info"><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i></div><h3>Machine Dimensions</h3><p>Reference the drawing when planning the machine footprint and work area.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-industry" aria-hidden="true"></i></div><h3>Production Layout</h3><p>Plan the operator position, fixture access, and surrounding production flow.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i></div><h3>Installation Review</h3><p>Confirm electrical, compressed-air, tooling, and safety requirements before installation.</p></div></div></section>';
    };

    const renderCatalogue = function () {
        const grid = document.getElementById('flat-printing-grid');
        if (!grid) {
            return;
        }

        grid.innerHTML = definitions.map(function (model) {
            return '<article class="machine-product-card"><img src="' + imageBase(model) + 'main-photo.jpg" alt="Winon ' + escapeHtml(model.id) + ' flat-screen screen printing machine"><div class="machine-product-content"><span>' + escapeHtml(model.variant) + '</span><h2>' + escapeHtml(model.id) + '</h2><p>' + escapeHtml(model.catalog) + '</p><a href="' + model.file + '" class="machine-btn">View details <i class="fas fa-arrow-right" aria-hidden="true"></i></a></div></article>';
        }).join('');
    };

    const renderDetail = function (model) {
        const main = document.querySelector('main');
        if (!main) {
            return;
        }

        const name = 'Winon ' + model.id;
        const base = imageBase(model);
        const quote = '../index.html?model=' + encodeURIComponent(name) + '#contact';
        const details = [['Model', model.id], ['Series', model.variant]].concat(model.specs).map(function (item) {
            return '<tr><th scope="row">' + escapeHtml(item[0]) + '</th><td>' + escapeHtml(item[1]) + '</td></tr>';
        }).join('');
        const featurePhoto = model.hasCloseUp ? base + 'close-up.jpg' : base + 'main-photo.jpg';
        const featurePhotoAlt = model.hasCloseUp ? 'Close-up of ' + name + ' screen printing machine' : name + ' screen printing machine';
        const features = model.features.map(function (item) {
            return feature(item[0], item[1], item[2]);
        }).join('');

        document.title = name + ' | ' + model.variant + ' | Printway';
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', name + ' ' + model.type.toLowerCase() + ' from Printway Marketing & Services.');
        }

        main.innerHTML =
            '<section class="machine-hero" aria-labelledby="machine-title"><div class="machine-main-photo"><img src="' + base + 'main-photo.jpg" alt="' + escapeHtml(name) + ' screen printing machine"></div><div class="machine-information"><p class="machine-eyebrow">SCREEN PRINTING MACHINE</p><h1 id="machine-title">' + escapeHtml(name) + '</h1><h2>' + escapeHtml(model.type) + '</h2><p class="machine-brand">Winon Industrial Co., Ltd. &mdash; Hong Kong</p><p>' + escapeHtml(model.description) + '</p><h3>Technical Details</h3><table class="machine-spec-table"><tbody>' + details + '</tbody></table><p class="machine-spec-note">Specifications are based on Winon\u2019s published product listing. Confirm available options, tooling, fixtures, and final production suitability with Printway.</p></div></section>' +
            '<section class="machine-feature-section" aria-labelledby="features-title"><div class="feature-image"><img src="' + featurePhoto + '" alt="' + escapeHtml(featurePhotoAlt) + '"></div><div class="feature-content"><p class="machine-eyebrow">BUILT FOR FLAT PRINTING</p><h2 id="features-title">Production Features</h2><div class="feature-list">' + features + '</div></div></section>' +
            renderApplications(model) +
            (model.hasTechnicalDrawing ? renderDrawing(model) : '') +
            '<section class="machine-contact-box" aria-labelledby="contact-title"><h2 id="contact-title">Interested in the ' + escapeHtml(name) + '?</h2><p>Contact Printway Marketing &amp; Services for pricing, machine configuration, product testing, spare parts, consumables, and technical support.</p><a href="' + quote + '" class="quote-button">Request a Quote</a></section>';

        const floatingQuote = document.querySelector('.quote-floating');
        if (floatingQuote) {
            floatingQuote.href = quote;
        }
    };

    const currentFile = window.location.pathname.split('/').pop().toLowerCase();
    const currentModel = definitions.find(function (model) {
        return model.file.toLowerCase() === currentFile;
    });

    if (currentModel) {
        renderDetail(currentModel);
    } else {
        renderCatalogue();
    }
}());
/* ==========================================
   SCREEN PRINTING - OVAL PRINTING SERIES
========================================== */

(function () {
    const seriesApplications = [
        ['fa-mug-hot', 'Cups & Drinkware', 'Cups, mugs, and drinkware printed on curved oval surfaces.'],
        ['fa-microchip', 'Electronic Products', 'Electronic products and plastic components with printed graphics.'],
        ['fa-spray-can-sparkles', 'Cosmetic Bottles', 'Cosmetic bottles and premium packaging with surface patterns.'],
        ['fa-plug', 'Joints & Fittings', 'Joints, connectors, and fittings requiring printed identification.'],
        ['fa-pen', 'Pens & Stationery', 'Pens and stationery marked with logos and product graphics.'],
        ['fa-bottle-water', 'Mineral Water Bottles', 'Mineral water bottles with printed labels and brand graphics.'],
        ['fa-shampoo', 'Shampoo Bottles', 'Shampoo and personal-care bottles with durable surface decoration.'],
        ['fa-gift', 'Toys & Consumer Products', 'Toys and similar consumer products with printed patterns.']
    ];

    const seriesFeatures = [
        ['fa-keyboard', 'Micro-electronic keyboard control', 'Versatile operation interface that is easy to operate.'],
        ['fa-gears', 'World-renowned pneumatic components', 'Powerful, durable, and solid operation from globally recognised pneumatic components.'],
        ['fa-sliders', 'Adjustable worktable and screen arm', 'Fine-tuning for quick, easy setup and simple plate changes.'],
        ['fa-arrows-rotate', 'Gear-rack synchronous transmission', 'Synchronous gear-and-rack drive with a suitable fixture ensures accurate positioning printing.'],
        ['fa-shield-halved', 'Special shock absorber', 'Shock-absorbed print delivery keeps printing performance superior and stable.']
    ];

    const definitions = [
        {
            id: 'WSC-360C',
            file: 'wsc-360C.html',
            asset: 'wsc-360C',
            variant: 'Oval Printing Series',
            type: 'Automatic oval-surface screen printing machine',
            catalog: 'Oval-surface screen printer for cylindrical, oval, and elliptical cups, bottles, tubes, and cans with a compact footprint.',
            description: 'Winon lists the WSC-360C as an oval-surface screen printer for cups, bottles, tubes, cans, and similar cylindrical, round-conical, and elliptical products. Micro-electronic keyboard control, a fine-tuning workbench and screen arm, synchronous gear-and-rack conveyance, and a special shock absorber deliver precise, stable curved-surface printing.',
            specs: [['Max. screen plate size', '350 × 550 mm'], ['Max. printing area', '110 / 200 × 345 mm'], ['Production speed', '1,300 cycles/hour'], ['Electric power', '110 V or 220 V, 50/60 Hz, 20 W'], ['External dimensions', '870 × 760 × 1,360 mm'], ['Net weight', '175 kg']],
            features: seriesFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WSC-260C',
            file: 'wsc-260C.html',
            asset: 'wsc-260C',
            variant: 'Oval Printing Series',
            type: 'Automatic oval-surface screen printing machine',
            catalog: 'Compact oval-surface screen printer for cups, bottles, tubes, cans, and other round and oval products.',
            description: 'Winon lists the WSC-260C as an oval-surface screen printer for cups, bottles, tubes, cans, and similar cylindrical, round-conical, and elliptical products. Micro-electronic keyboard control, a fine-tuning workbench and screen arm, synchronous gear-and-rack conveyance, and a special shock absorber deliver precise, stable curved-surface printing.',
            specs: [['Max. screen plate size', '350 × 450 mm'], ['Max. printing area', '80 / 200 × 250 mm'], ['Production speed', '1,500 cycles/hour'], ['Worktable size', '350 × 650 mm'], ['Electric power', '110 V or 220 V, 50/60 Hz, 20 W'], ['External dimensions', '690 × 630 × 1,660 mm'], ['Net weight', '145 kg']],
            features: seriesFeatures,
            applications: seriesApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        }
    ];

    const escapeHtml = function (value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character];
        });
    };

    const imageBase = function (model) {
        return '../images/machines/screen/' + model.asset + '/';
    };

    const feature = function (icon, title, text) {
        return '<div class="feature-box"><div class="feature-icon"><i class="fa-solid ' + icon + '" aria-hidden="true"></i></div><div><h3>' + escapeHtml(title) + '</h3><p>' + escapeHtml(text) + '</p></div></div>';
    };

    const renderApplications = function (model) {
        const intro = 'Winon applies this series to surface printing on cups, electronic products, cosmetic bottles, joints and fittings, pens, toys, mineral water bottles, shampoo bottles, and similar products. Special designs are available for specific customer requirements.';
        const cards = model.applications.map(function (item) {
            return '<div class="product-card"><div class="product-icon"><i class="fa-solid ' + item[0] + '" aria-hidden="true"></i></div><h3>' + escapeHtml(item[1]) + '</h3><p>' + escapeHtml(item[2]) + '</p></div>';
        }).join('');

        if (!model.hasTechnicalDrawing) {
            const applicationCards = model.applications.map(function (item) {
                return '<article class="application-card"><div class="application-icon"><i class="fa-solid ' + item[0] + '" aria-hidden="true"></i></div><h3>' + escapeHtml(item[1]) + '</h3><p>' + escapeHtml(item[2]) + '</p></article>';
            }).join('');

            return '<section class="machine-applications" aria-labelledby="applications-title"><div class="section-header"><h2 id="applications-title">Application Areas</h2><p>This model does not have a supplied technical drawing, so the page shows application areas instead. ' + escapeHtml(intro) + '</p></div><div class="application-grid">' + applicationCards + '</div></section>';
        }

        return '<section class="printable-products" aria-labelledby="products-title"><div class="section-header"><h2 id="products-title">Typical Applications</h2><p>' + escapeHtml(intro) + '</p></div><div class="products-grid">' + cards + '</div></section>';
    };

    const renderDrawing = function (model) {
        const base = imageBase(model);
        const name = 'Winon ' + model.id;

        return '<section class="machine-drawing" aria-labelledby="drawing-title"><div class="section-header"><h2 id="drawing-title">Technical Drawing</h2><p>Use the drawing as an installation and layout reference. Confirm final space, utilities, tooling, and production requirements with Printway before installation.</p></div><div class="drawing-container"><img src="' + base + 'technical-drawing.jpg" alt="Technical drawing of ' + escapeHtml(name) + ' screen printing machine"></div><div class="drawing-info"><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i></div><h3>Machine Dimensions</h3><p>Reference the drawing when planning the machine footprint and work area.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-industry" aria-hidden="true"></i></div><h3>Production Layout</h3><p>Plan the operator position, fixture access, and surrounding production flow.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i></div><h3>Installation Review</h3><p>Confirm electrical, compressed-air, tooling, and safety requirements before installation.</p></div></div></section>';
    };

    const renderCatalogue = function () {
        const grid = document.getElementById('oval-printing-grid');
        if (!grid) {
            return;
        }

        grid.innerHTML = definitions.map(function (model) {
            return '<article class="machine-product-card"><img src="' + imageBase(model) + 'main-photo.jpg" alt="Winon ' + escapeHtml(model.id) + ' oval-surface screen printing machine"><div class="machine-product-content"><span>' + escapeHtml(model.variant) + '</span><h2>' + escapeHtml(model.id) + '</h2><p>' + escapeHtml(model.catalog) + '</p><a href="' + model.file + '" class="machine-btn">View details <i class="fas fa-arrow-right" aria-hidden="true"></i></a></div></article>';
        }).join('');
    };

    const renderDetail = function (model) {
        const main = document.querySelector('main');
        if (!main) {
            return;
        }

        const name = 'Winon ' + model.id;
        const base = imageBase(model);
        const quote = '../index.html?model=' + encodeURIComponent(name) + '#contact';
        const details = [['Model', model.id], ['Series', model.variant]].concat(model.specs).map(function (item) {
            return '<tr><th scope="row">' + escapeHtml(item[0]) + '</th><td>' + escapeHtml(item[1]) + '</td></tr>';
        }).join('');
        const featurePhoto = model.hasCloseUp ? base + 'close-up.jpg' : base + 'main-photo.jpg';
        const featurePhotoAlt = model.hasCloseUp ? 'Close-up of ' + name + ' screen printing machine' : name + ' screen printing machine';
        const features = model.features.map(function (item) {
            return feature(item[0], item[1], item[2]);
        }).join('');

        document.title = name + ' | ' + model.variant + ' | Printway';
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', name + ' ' + model.type.toLowerCase() + ' from Printway Marketing & Services.');
        }

        main.innerHTML =
            '<section class="machine-hero" aria-labelledby="machine-title"><div class="machine-main-photo"><img src="' + base + 'main-photo.jpg" alt="' + escapeHtml(name) + ' screen printing machine"></div><div class="machine-information"><p class="machine-eyebrow">SCREEN PRINTING MACHINE</p><h1 id="machine-title">' + escapeHtml(name) + '</h1><h2>' + escapeHtml(model.type) + '</h2><p class="machine-brand">Winon Industrial Co., Ltd. &mdash; Hong Kong</p><p>' + escapeHtml(model.description) + '</p><h3>Technical Details</h3><table class="machine-spec-table"><tbody>' + details + '</tbody></table><p class="machine-spec-note">Specifications are based on Winon’s published product listing. Confirm available options, tooling, fixtures, and final production suitability with Printway.</p></div></section>' +
            '<section class="machine-feature-section" aria-labelledby="features-title"><div class="feature-image"><img src="' + featurePhoto + '" alt="' + escapeHtml(featurePhotoAlt) + '"></div><div class="feature-content"><p class="machine-eyebrow">BUILT FOR OVAL PRINTING</p><h2 id="features-title">Production Features</h2><div class="feature-list">' + features + '</div></div></section>' +
            renderApplications(model) +
            (model.hasTechnicalDrawing ? renderDrawing(model) : '') +
            '<section class="machine-contact-box" aria-labelledby="contact-title"><h2 id="contact-title">Interested in the ' + escapeHtml(name) + '?</h2><p>Contact Printway Marketing &amp; Services for pricing, machine configuration, product testing, spare parts, consumables, and technical support.</p><a href="' + quote + '" class="quote-button">Request a Quote</a></section>';

        const floatingQuote = document.querySelector('.quote-floating');
        if (floatingQuote) {
            floatingQuote.href = quote;
        }
    };

    const currentFile = window.location.pathname.split('/').pop().toLowerCase();
    const currentModel = definitions.find(function (model) {
        return model.file.toLowerCase() === currentFile;
    });

    if (currentModel) {
        renderDetail(currentModel);
    } else {
        renderCatalogue();
    }
}());

/* ==========================================
   SCREEN PRINTING - SPECIAL SCREEN PRINT SERIES
========================================== */

(function () {
    const ccdApplications = [
        ['fa-display', 'Touch & Display Panels', 'Touch panels, phone window glass, and notebook screen glass.'],
        ['fa-solar-panel', 'EL & Diffuser Sheets', 'Cold-light (EL) panels and optical diffuser sheets.'],
        ['fa-microchip', 'Flexible Circuit Boards', 'Flexible circuit boards, BGA, and flip-chip components.'],
        ['fa-mobile-screen', 'Mobile & Electronics Glass', 'High-precision phone and electronic device window glass.']
    ];

    const lineApplications = [
        ['fa-champagne-glasses', 'Round & Oval Containers', 'Cylindrical and oval containers, bottles, and tubes.'],
        ['fa-bottle-water', 'Cosmetic & Personal Care', 'Cosmetic bottles, jars, and personal-care packaging.'],
        ['fa-layer-group', 'Multi-Colour Products', 'Round and flat products printed in one to six colours.'],
        ['fa-glass-water', 'Beverage & Glassware', 'Bottles and glass containers suited to UV-curable inks.']
    ];

    const uvScreenFeatures = [
        ['fa-sun', 'UV-curable printing', 'Configured for UV-curable screen printing applications on curved surfaces.'],
        ['fa-display', 'Multi-function microcomputer control', 'Versatile, easy operation with multi-function microcomputer control.'],
        ['fa-crosshairs', 'Precise printing positioning', 'Micro-adjustable worktable and screen arm with accurate fixture positioning.'],
        ['fa-gears', 'World-renowned pneumatic components', 'Powerful, durable operation from globally recognised pneumatic components.']
    ];

    const ccdFeatures = [
        ['fa-camera', 'CCD automatic alignment', 'CCD vision system for precise automatic registration and alignment.'],
        ['fa-bolt', 'Servo motor drive', 'Servo-driven motion with a silent ball screw and precision linear guide rails.'],
        ['fa-display', 'PLC touch-screen control', 'PLC control with a touch-screen interface for easy setup and operation.'],
        ['fa-crosshairs', 'Screen X/Y/Z/angle adjustment', 'Fine micro-adjustment of the screen plate in X, Y, Z, and angle.'],
        ['fa-sliders', 'Auto screen-frame change', 'Automatic screen-frame positioning and clamping for quick changeovers.']
    ];

    const uvFeatures = [
        ['fa-fire-flame-curved', 'Flame surface treatment', 'In-line flame treatment prepares container surfaces for printing.'],
        ['fa-bolt', 'Fully automated line', 'Automatic feeding, alignment, printing, and UV curing in sequence.'],
        ['fa-display', 'PLC control system', 'Fully automated PLC-controlled operation of the printing line.'],
        ['fa-triangle-exclamation', 'Auto sensing functions', 'Sensors stop printing on missing workpieces and alarm on low air pressure.']
    ];

    const definitions = [
        {
            id: 'WSC-632UV/GUV',
            file: 'wsc-632UVGUV.html',
            asset: 'wsc-632UVGUV',
            variant: 'Special Screen Print',
            type: 'UV screen printing machine',
            catalog: 'UV screen printing machine for oval, cylindrical, and curved products printed with UV-curable inks.',
            description: 'Winon lists the WSC-632UV/GUV as a special-purpose screen printing machine configured for UV-curable ink printing. It is designed to decorate oval, cylindrical, and curved product surfaces with fast-curing, durable graphics, making it well suited to containers, packaging, and glassware. Full technical details, ink recommendations, and configuration options are available from Printway on request.',
            specs: [['Curing system', 'UV-curable inks'], ['Control', 'Multi-function microcomputer control'], ['Full technical specification', 'Available from Printway on request']],
            features: uvScreenFeatures,
            applications: null,
            hasTechnicalDrawing: false,
            hasCloseUp: false
        },
        {
            id: 'WSC-350BDE-CCD',
            file: 'wsc-350BDE-CCD.html',
            asset: 'wsc-350BDE-CCD',
            variant: 'Special Screen Print',
            type: 'CCD automatic-registration screen printing machine',
            catalog: 'High-precision CCD automatic-registration screen printer for touch panels, EL and diffuser sheets, and flexible circuit boards.',
            description: 'Winon specifies the WSC-350BDE-CCD as an automatic-registration screen printing machine with a CCD vision system for precise alignment. It combines PLC touch-screen control, micro-adjustable screen positioning in X, Y, Z, and angle, servo-motor drive with a silent ball screw and precision linear guides, and automatic screen-frame positioning and changing. It is suited to high-precision printing on EL panels, diffuser sheets, touch panels, flexible circuit boards, BGA and flip-chip components, and phone and notebook screen glass.',
            specs: [['Registration precision', '±0.01 mm'], ['Registration time', 'Under 1 s'], ['Repeat printing precision', '±0.005'], ['Max. printing area', '300 × 200 mm'], ['CCD imaging range', 'X ±150, Y ±100'], ['Max. capacity', '600 cycles/hour'], ['Machine dimensions', '900 × 1,400 × 1,700 mm'], ['Power specifications', '220 V / 380 V, 50/60 Hz']],
            features: ccdFeatures,
            applications: ccdApplications,
            hasTechnicalDrawing: false,
            hasCloseUp: false
        },
        {
            id: 'WSC-120I-UV-N',
            file: 'wsc-120I-UV-N.html',
            asset: 'wsc-120I-UV-N',
            variant: 'Special Screen Print',
            type: 'Fully automated multi-screen UV printing line',
            catalog: 'Fully automated multi-screen UV printing line for multi-colour printing on round and flat products.',
            description: 'Winon specifies the WSC-120I-UV-N as a fully automated, high-speed multi-screen printing line with UV curing for printing on round and flat products. It brings together one main printer and several auxiliary units for automatic feeding, flame treatment, automatic alignment, screen printing, and UV curing, making it an excellent choice for printing cylindrical or oval containers in mass production. Various auto-sensing functions stop printing when a workpiece is missing and alarm on low air pressure.',
            specs: [['Printing colours', '1 to 6 colours (2-colour standard configurations)'], ['Round printing area', '120 × 300 mm'], ['Flat printing area', '260 × 300 mm'], ['Round product size', 'D 20–120 mm × H 40–300 mm'], ['Flat product size', 'W 25–260 mm × H 40–300 mm'], ['Printing speed', '2,500–3,000 pcs/hour'], ['Power supply', '380 V, 3-phase'], ['Round configuration power', '6.5 kW'], ['Flat configuration power', '5.5 kW'], ['Air supply', '0.6 MPa / 300 L'], ['Gas supply', '0.15 MPa'], ['Round machine dimensions', '2,965 × 1,945 × 2,235 mm'], ['Flat machine dimensions', '1,950 × 1,080 × 2,040 mm'], ['Net weight (round / flat)', '1,300 kg / 1,200 kg']],
            features: uvFeatures,
            applications: lineApplications,
            hasTechnicalDrawing: false,
            hasCloseUp: false
        }
    ];

    const escapeHtml = function (value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character];
        });
    };

    const imageBase = function (model) {
        return '../images/machines/screen/' + model.asset + '/';
    };

    const feature = function (icon, title, text) {
        return '<div class="feature-box"><div class="feature-icon"><i class="fa-solid ' + icon + '" aria-hidden="true"></i></div><div><h3>' + escapeHtml(title) + '</h3><p>' + escapeHtml(text) + '</p></div></div>';
    };

    const renderApplications = function (model) {
        if (!model.applications || !model.applications.length) {
            return '';
        }

        const intro = 'Winon applies this series to specialised screen printing on electronic components, optical films, display glass, containers, and other dedicated production applications. Special designs are available for specific customer requirements.';
        const applicationCards = model.applications.map(function (item) {
            return '<article class="application-card"><div class="application-icon"><i class="fa-solid ' + item[0] + '" aria-hidden="true"></i></div><h3>' + escapeHtml(item[1]) + '</h3><p>' + escapeHtml(item[2]) + '</p></article>';
        }).join('');

        return '<section class="machine-applications" aria-labelledby="applications-title"><div class="section-header"><h2 id="applications-title">Application Areas</h2><p>' + escapeHtml(intro) + '</p></div><div class="application-grid">' + applicationCards + '</div></section>';
    };

    const renderDrawing = function (model) {
        const base = imageBase(model);
        const name = 'Winon ' + model.id;

        return '<section class="machine-drawing" aria-labelledby="drawing-title"><div class="section-header"><h2 id="drawing-title">Technical Drawing</h2><p>Use the drawing as an installation and layout reference. Confirm final space, utilities, tooling, and production requirements with Printway before installation.</p></div><div class="drawing-container"><img src="' + base + 'technical-drawing.jpg" alt="Technical drawing of ' + escapeHtml(name) + ' screen printing machine"></div><div class="drawing-info"><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i></div><h3>Machine Dimensions</h3><p>Reference the drawing when planning the machine footprint and work area.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-industry" aria-hidden="true"></i></div><h3>Production Layout</h3><p>Plan the operator position, fixture access, and surrounding production flow.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i></div><h3>Installation Review</h3><p>Confirm electrical, compressed-air, tooling, and safety requirements before installation.</p></div></div></section>';
    };

    const renderCatalogue = function () {
        const grid = document.getElementById('special-screen-print-grid');
        if (!grid) {
            return;
        }

        grid.innerHTML = definitions.map(function (model) {
            return '<article class="machine-product-card"><img src="' + imageBase(model) + 'main-photo.jpg" alt="Winon ' + escapeHtml(model.id) + ' special screen printing machine"><div class="machine-product-content"><span>' + escapeHtml(model.variant) + '</span><h2>' + escapeHtml(model.id) + '</h2><p>' + escapeHtml(model.catalog) + '</p><a href="' + model.file + '" class="machine-btn">View details <i class="fas fa-arrow-right" aria-hidden="true"></i></a></div></article>';
        }).join('');
    };

    const renderDetail = function (model) {
        const main = document.querySelector('main');
        if (!main) {
            return;
        }

        const name = 'Winon ' + model.id;
        const base = imageBase(model);
        const quote = '../index.html?model=' + encodeURIComponent(name) + '#contact';
        const details = [['Model', model.id], ['Series', model.variant]].concat(model.specs || []).map(function (item) {
            return '<tr><th scope="row">' + escapeHtml(item[0]) + '</th><td>' + escapeHtml(item[1]) + '</td></tr>';
        }).join('');
        const featurePhoto = model.hasCloseUp ? base + 'close-up.jpg' : base + 'main-photo.jpg';
        const featurePhotoAlt = model.hasCloseUp ? 'Close-up of ' + name + ' screen printing machine' : name + ' screen printing machine';
        const features = model.features.map(function (item) {
            return feature(item[0], item[1], item[2]);
        }).join('');

        document.title = name + ' | ' + model.variant + ' | Printway';
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', name + ' ' + model.type.toLowerCase() + ' from Printway Marketing & Services.');
        }

        main.innerHTML =
            '<section class="machine-hero" aria-labelledby="machine-title"><div class="machine-main-photo"><img src="' + base + 'main-photo.jpg" alt="' + escapeHtml(name) + ' screen printing machine"></div><div class="machine-information"><p class="machine-eyebrow">SCREEN PRINTING MACHINE</p><h1 id="machine-title">' + escapeHtml(name) + '</h1><h2>' + escapeHtml(model.type) + '</h2><p class="machine-brand">Winon Industrial Co., Ltd. &mdash; Hong Kong</p><p>' + escapeHtml(model.description) + '</p><h3>Technical Details</h3><table class="machine-spec-table"><tbody>' + details + '</tbody></table><p class="machine-spec-note">Specifications are based on Winon’s published product listing. Confirm available options, tooling, fixtures, and final production suitability with Printway.</p></div></section>' +
            '<section class="machine-feature-section" aria-labelledby="features-title"><div class="feature-image"><img src="' + featurePhoto + '" alt="' + escapeHtml(featurePhotoAlt) + '"></div><div class="feature-content"><p class="machine-eyebrow">BUILT FOR SPECIAL SCREEN PRINTING</p><h2 id="features-title">Production Features</h2><div class="feature-list">' + features + '</div></div></section>' +
            renderApplications(model) +
            (model.hasTechnicalDrawing ? renderDrawing(model) : '') +
            '<section class="machine-contact-box" aria-labelledby="contact-title"><h2 id="contact-title">Interested in the ' + escapeHtml(name) + '?</h2><p>Contact Printway Marketing &amp; Services for pricing, machine configuration, product testing, spare parts, consumables, and technical support.</p><a href="' + quote + '" class="quote-button">Request a Quote</a></section>';

        const floatingQuote = document.querySelector('.quote-floating');
        if (floatingQuote) {
            floatingQuote.href = quote;
        }
    };

    const currentFile = window.location.pathname.split('/').pop().toLowerCase();
    const currentModel = definitions.find(function (model) {
        return model.file.toLowerCase() === currentFile;
    });

    if (currentModel) {
        renderDetail(currentModel);
    } else {
        renderCatalogue();
    }
}());

/* ==========================================
   SCREEN PRINTING - SCREEN AUTOMATION SERIES
========================================== */

(function () {
    const automationApplications = [
        ['fa-fire-flame-curved', 'Lighter Printing', 'Suitable for all kinds of lighter pattern printing on round lighter bodies.']
    ];

    const automationFeatures = [
        ['fa-robot', 'Manipulator feeding & discharging', 'A manipulator automatically feeds and discharges parts for continuous, hands-free operation.'],
        ['fa-gears', 'Precision indexer rotary table', 'A precision indexer rotary-table design keeps tooling stable for accurate registration and consistent printing quality.'],
        ['fa-arrows-up-down', 'Adjustable lifting platforms', 'Cylinder-driven lifting parts with adjustable height provide stable and repeatable positioning.'],
        ['fa-bolt', 'Adjustable blade stroke & speed', 'The squeegee blade runs on a rodless cylinder with adjustable stroke and speed for process control.'],
        ['fa-wrench', 'Separate doctor-blade angles', 'The doctor blade and covering ink blade angles can be adjusted separately to suit the print.'],
        ['fa-display', 'PLC touch-screen control', 'Stroke and machine parameters are easy to adjust with PLC control and a touch-screen system.'],
        ['fa-shield', 'Easy cleaning with heads-up function', 'The heads-up function lifts the doctor and screen plate for easy cleaning and assembly.'],
        ['fa-award', 'World-renowned pneumatic components', 'Pneumatic components from well-known brands deliver powerful, durable, reliable operation.']
    ];

    const definitions = [
        {
            id: 'WSC-060BR / 8F',
            file: 'wsc-060BR8F.html',
            asset: 'wsc-060BR8F',
            variant: 'Screen Automation',
            type: 'Indexer rotary-table screen printing line',
            catalog: 'Automated screen printing line combining manipulator feeding and discharging with a precision indexer rotary-table printer.',
            description: 'Winon specifies the WSC-060BR/8F as a manipulator-based automated screen printing line. It combines a manipulator for automatic feeding and discharging with an indexer rotary-table screen printing machine. Lifting parts are driven by cylinders with adjustable height for stable positioning, and the squeegee blade runs on a rodless cylinder with adjustable stroke and speed. The doctor blade and covering ink blade angles can be set separately, and the heads-up function makes the doctor and screen plate easy to clean and assemble. Stroke and machine parameters are adjusted easily through PLC control and a touch-screen system.',
            specs: [['Screen frame size', '200 × 350 mm'], ['Max. printing area', '60 × 160 mm'], ['Rotary table size', 'ø720 mm'], ['Max. printing speed', '1,300 cycles/hr (6,500 pcs/hr)'], ['Power supply', '220 V, 50 Hz'], ['Air supply', '5–7 bar'], ['Rated power', '1.25 kW'], ['Machine dimensions', '2,450 × 1,540 × 1,600 mm']],
            features: automationFeatures,
            applications: automationApplications,
            applicationImage: 'application-areas.jpg',
            applicationIntro: 'Winon lists the WSC-060BR/8F for printing all kinds of lighter patterns on round lighter bodies.',
            hasTechnicalDrawing: false,
            hasCloseUp: true
        }
    ];

    const escapeHtml = function (value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character];
        });
    };

    const imageBase = function (model) {
        return '../images/machines/screen/' + model.asset + '/';
    };

    const feature = function (icon, title, text) {
        return '<div class="feature-box"><div class="feature-icon"><i class="fa-solid ' + icon + '" aria-hidden="true"></i></div><div><h3>' + escapeHtml(title) + '</h3><p>' + escapeHtml(text) + '</p></div></div>';
    };

    const renderApplications = function (model) {
        if (!model.applications || !model.applications.length) {
            return '';
        }

        const intro = 'Winon applies this series to specialised screen printing on containers, packaging, and other dedicated production applications. Special designs are available for specific customer requirements.';
        const applicationImage = model.applicationImage
            ? '<div class="application-area-layout"><div class="application-area-image"><img src="' + imageBase(model) + model.applicationImage + '" alt="Application areas for ' + escapeHtml(model.id) + '"></div><div class="application-area-content"><h3>Application Areas</h3><p>' + escapeHtml(model.applicationIntro || intro) + '</p></div></div>'
            : '';
        const applicationCards = model.applications.map(function (item) {
            return '<article class="application-card"><div class="application-icon"><i class="fa-solid ' + item[0] + '" aria-hidden="true"></i></div><h3>' + escapeHtml(item[1]) + '</h3><p>' + escapeHtml(item[2]) + '</p></article>';
        }).join('');

        return '<section class="machine-applications" aria-labelledby="applications-title"><div class="section-header"><h2 id="applications-title">' + escapeHtml('Application Areas') + '</h2><p>' + escapeHtml(intro) + '</p></div>' + applicationImage + '<div class="application-grid">' + applicationCards + '</div></section>';
    };

    const renderCatalogue = function () {
        const grid = document.getElementById('screen-automation-grid');
        if (!grid) {
            return;
        }

        grid.innerHTML = definitions.map(function (model) {
            return '<article class="machine-product-card"><img src="' + imageBase(model) + 'main-photo.jpg" alt="Winon ' + escapeHtml(model.id) + ' screen printing machine"><div class="machine-product-content"><span>' + escapeHtml(model.variant) + '</span><h2>' + escapeHtml(model.id) + '</h2><p>' + escapeHtml(model.catalog) + '</p><a href="' + model.file + '" class="machine-btn">View details <i class="fas fa-arrow-right" aria-hidden="true"></i></a></div></article>';
        }).join('');
    };

    const renderDetail = function (model) {
        const main = document.querySelector('main');
        if (!main) {
            return;
        }

        const name = 'Winon ' + model.id;
        const base = imageBase(model);
        const quote = '../index.html?model=' + encodeURIComponent(name) + '#contact';
        const details = [['Model', model.id], ['Series', model.variant]].concat(model.specs || []).map(function (item) {
            return '<tr><th scope="row">' + escapeHtml(item[0]) + '</th><td>' + escapeHtml(item[1]) + '</td></tr>';
        }).join('');
        const featurePhoto = model.hasCloseUp ? base + 'close-up.jpg' : base + 'main-photo.jpg';
        const featurePhotoAlt = model.hasCloseUp ? 'Close-up of ' + name + ' screen printing machine' : name + ' screen printing machine';
        const features = model.features.map(function (item) {
            return feature(item[0], item[1], item[2]);
        }).join('');

        document.title = name + ' | ' + model.variant + ' | Printway';
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', name + ' ' + model.type.toLowerCase() + ' from Printway Marketing & Services.');
        }

        main.innerHTML =
            '<section class="machine-hero" aria-labelledby="machine-title"><div class="machine-main-photo"><img src="' + base + 'main-photo.jpg" alt="' + escapeHtml(name) + ' screen printing machine"></div><div class="machine-information"><p class="machine-eyebrow">SCREEN PRINTING MACHINE</p><h1 id="machine-title">' + escapeHtml(name) + '</h1><h2>' + escapeHtml(model.type) + '</h2><p class="machine-brand">Winon Industrial Co., Ltd. &mdash; Hong Kong</p><p>' + escapeHtml(model.description) + '</p><h3>Technical Details</h3><table class="machine-spec-table"><tbody>' + details + '</tbody></table><p class="machine-spec-note">Specifications are based on Winon’s published product listing. Confirm available options, tooling, fixtures, and final production suitability with Printway.</p></div></section>' +
            '<section class="machine-feature-section" aria-labelledby="features-title"><div class="feature-image"><img src="' + featurePhoto + '" alt="' + escapeHtml(featurePhotoAlt) + '"></div><div class="feature-content"><p class="machine-eyebrow">BUILT FOR SCREEN AUTOMATION</p><h2 id="features-title">Production Features</h2><div class="feature-list">' + features + '</div></div></section>' +
            renderApplications(model) +
            '<section class="machine-contact-box" aria-labelledby="contact-title"><h2 id="contact-title">Interested in the ' + escapeHtml(name) + '?</h2><p>Contact Printway Marketing &amp; Services for pricing, machine configuration, product testing, spare parts, consumables, and technical support.</p><a href="' + quote + '" class="quote-button">Request a Quote</a></section>';

        const floatingQuote = document.querySelector('.quote-floating');
        if (floatingQuote) {
            floatingQuote.href = quote;
        }
    };

    const currentFile = window.location.pathname.split('/').pop().toLowerCase();
    const currentModel = definitions.find(function (model) {
        return model.file.toLowerCase() === currentFile;
    });

    if (currentModel) {
        renderDetail(currentModel);
    } else {
        renderCatalogue();
    }
}());
/* ==========================================
   OTHER PRINTER
========================================== */

(function () {
    const gridMap = {
        'Stamping Machines': 'stamping-machines-grid',
        'Heat Transfer': 'heat-transfer-grid',
        'Offset Printer': 'offset-printer-grid'
    };

    const stampingFeatures = [
        ['fa-fire', 'Heated stamping plate', 'Precision-heated plate for consistent foil transfer across various materials and surface temperatures.'],
        ['fa-arrows-left-right', 'Adjustable stamping force', 'Stamping pressure is adjustable to match different workpiece materials, geometries, and foil types.'],
        ['fa-ruler', 'Precision worktable', 'Worktable with fine positional adjustment for accurate registration on each print cycle.'],
        ['fa-gears', 'Pneumatic operation', 'Air-driven stamping mechanism provides repeatable force and smooth, consistent cycling.'],
        ['fa-layer-group', 'Foil feeding system', 'Automatic or manual foil advance for continuous stamping without manual repositioning.'],
        ['fa-toolbox', 'Versatile workpiece handling', 'Accommodates a wide range of flat, round, and curved components across production runs.']
    ];

    const autoStampingFeatures = [
        ['fa-robot', 'Fully automatic operation', 'Automated feeding, stamping, and discharge for continuous high-speed production.'],
        ['fa-bolt', 'High-speed production', 'Optimised cycle rates for cap, bottle, and container stamping at scale.'],
        ['fa-gears', 'Precision rotary indexing', 'Rotary indexing positions each workpiece accurately under the stamping head.'],
        ['fa-wrench', 'Easy tooling changeover', 'Quick-change fixtures allow fast transition between cap sizes and product types.'],
        ['fa-display', 'PLC touch-screen control', 'Touch-screen PLC interface for easy parameter adjustment and recipe storage.'],
        ['fa-shield', 'Safety interlocks', 'Pneumatic safety interlocks and guards protect operators during automated cycles.']
    ];

    const heatTransferFeatures = [
        ['fa-circle', 'Silicone roller transfer', 'Heated silicone roller applies even pressure for clean transfer on flat and curved surfaces.'],
        ['fa-microchip', 'Micro-computer control', 'Programmable delay, pressure, and speed settings for precise heat transfer reproduction.'],
        ['fa-layer-group', 'Multi-material compatibility', 'Works with foils, calico papers, and heat transfer papers on plastics, wood, and coated surfaces.'],
        ['fa-arrows-left-right', 'Adjustable stroke settings', 'Stroke and forth-stroke lengths are adjustable to suit different workpiece geometries.'],
        ['fa-ruler', 'Precision worktable', 'Worktable with fine positional adjustment for accurate registration on each transfer cycle.'],
        ['fa-industry', 'Floor-standing production design', 'Rigid floor-standing frame provides stability for high-volume production environments.']
    ];

    const offsetFeatures = [
        ['fa-print', 'Multi-colour UV offset', '1-4 colour offset printing with lacquer for high-resolution cap and closure decoration.'],
        ['fa-sun', 'UV curing system', 'Integrated UV lamps cure ink instantly for smudge-free, high-speed output.'],
        ['fa-robot', 'Fully automatic production line', 'Complete line from cap feeding and unscrambling through printing to packing.'],
        ['fa-bolt', 'High-speed output', 'Production speeds suitable for high-volume mineral water and beverage cap printing.'],
        ['fa-cogs', 'Magnetic plate printing heads', 'Magnetic printing plate heads with micro-registration for precise multi-colour alignment.'],
        ['fa-display', 'PLC line control', 'Central PLC synchronises feeder, printer, UV curing, and packing stages.']
    ];

    const stampingApplications = [
        ['fa-wine-bottle', 'Bottle Caps', 'Foil stamping on plastic and metal bottle caps for premium branding.'],
        ['fa-flask', 'Cosmetic Containers', 'Decoration on cosmetic jars, compacts, and personal-care packaging.'],
        ['fa-pen-fancy', 'Pen Shafts', 'Cylindrical hot stamping on pen bodies, marker caps, and writing instruments.'],
        ['fa-tag', 'Trademarks & Logos', 'Foil stamping of brand logos and trademarks on various product components.'],
        ['fa-microchip', 'Electronic Components', 'Stamping on keypads, buttons, and electronic device housings.'],
        ['fa-box', 'Packaging Components', 'Decoration on closures, lids, and packaging hardware.']
    ];

    const heatTransferApplications = [
        ['fa-wine-bottle', 'Bottle Caps', 'Heat transfer printing on plastic and metal caps with foils and transfer papers.'],
        ['fa-flask', 'Cosmetic Packaging', 'Decoration on cosmetic containers, cases, and personal-care products.'],
        ['fa-pen-fancy', 'Pen Shafts', 'Cylindrical heat transfer on pen bodies and similar round components.'],
        ['fa-tag', 'Trademarks & Labels', 'Heat transfer of brand graphics, labels, and decorative patterns.'],
        ['fa-box', 'Flat Panels', 'Printing on flat panels, signs, and promotional items using heat transfer papers.'],
        ['fa-layer-group', 'Multi-Surface Printing', 'Compatible with plastics, wood, and coated surfaces for versatile decoration.']
    ];

    const definitions = [
        {
            id: 'WFH-120BP',
            file: 'wfh-120BP.html',
            asset: 'wfh-120BP',
            variant: 'Stamping Machines',
            heroEyebrow: 'STAMPING MACHINE',
            type: 'Floor-standing hot stamping machine',
            catalog: 'Heavy-duty floor-standing hot stamping machine with 300 kg stamping force and 3,000 W heating for medium flat-surface production.',
            description: 'The WFH-120BP is a heavy-duty floor-standing hot stamping machine with a 300 kg stamping force and a 100 x 150 mm heated plate. Its main shaft is ground for precision and its low-pressure operation makes it suitable for a wide range of small-to-medium flat-surface printing tasks on plastic, metal, and coated components.',
            specs: [['Stamp force', '300 kg'], ['Plate size', '100 x 150 mm'], ['Stamping stroke', '75 mm'], ['Center distance', '160 mm'], ['Power supply', '220 V, 50/60 Hz'], ['Heating power', '3,000 W'], ['Machine dimensions', '2,020 x 1,420 x 1,730 mm'], ['Net weight', '850 kg']],
            features: stampingFeatures,
            applications: stampingApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WFH-150',
            file: 'wfh-150.html',
            asset: 'wfh-150',
            variant: 'Stamping Machines',
            heroEyebrow: 'STAMPING MACHINE',
            type: 'Pneumatic hot stamping machine',
            catalog: 'Mid-range hot stamping machine with 150 kg force, 150 x 120 mm plate, and 220 x 200 mm worktable for versatile production.',
            description: 'The WFH-150 is a pneumatic hot stamping machine with a 150 kg stamping force, a 150 x 120 mm heated plate, and a 220 x 200 mm worktable. Its stroke-fixing function and adjustable foil advance (0-200 mm) support consistent registration on caps, containers, and flat components.',
            specs: [['Stamp force', '150 kg'], ['Plate size', '150 x 120 mm'], ['Worktable size', '220 x 200 mm'], ['Stamping stroke', '75 mm'], ['Center distance', '160 mm'], ['Max. workpiece height', '150 mm'], ['Foil width', '0-200 mm'], ['Power supply', '220 V, 50/60 Hz'], ['Heating power', '650 W'], ['Machine dimensions', '600 x 500 x 1,580 mm'], ['Net weight', '138 kg']],
            features: stampingFeatures,
            applications: stampingApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WFH-180H',
            file: 'wfh-180H.html',
            asset: 'wfh-180H',
            variant: 'Stamping Machines',
            heroEyebrow: 'STAMPING MACHINE',
            type: 'Manual hot stamping machine',
            catalog: 'Compact manual hot stamping machine with 180 mm plate for small-batch flat and cylindrical surface stamping.',
            description: 'The WFH-180H is a compact manual hot stamping machine with a 180 x 140 mm heated plate and a 190 x 150 mm worktable. Its lightweight benchtop design and manual operation make it suitable for small-batch stamping on caps, containers, and small components with a maximum workpiece height of 55 mm.',
            specs: [['Stamp force', 'Manual'], ['Plate size', '180 x 140 mm'], ['Worktable size', '190 x 150 mm'], ['Center distance', '160 mm'], ['Max. workpiece height', '55 mm'], ['Foil width', '0-200 mm'], ['Power supply', '220 V, 50/60 Hz'], ['Heating power', '650 W'], ['Machine dimensions', '670 x 580 x 500 mm'], ['Net weight', '35 kg']],
            features: stampingFeatures,
            applications: stampingApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WFH-300',
            file: 'wfh-300.html',
            asset: 'wfh-300',
            variant: 'Stamping Machines',
            heroEyebrow: 'STAMPING MACHINE',
            type: 'Pneumatic hot stamping machine',
            catalog: 'High-force hot stamping machine with 300 kg stamping force, 280 x 200 mm worktable, and 250 mm workpiece clearance.',
            description: 'The WFH-300 is a high-force pneumatic hot stamping machine with a 300 kg stamping force, a 220 x 140 mm plate, and a 280 x 200 mm worktable. Its 250 mm workpiece clearance and 0-300 mm foil width accommodate larger components for stamping on caps, containers, and industrial parts.',
            specs: [['Stamp force', '300 kg'], ['Plate size', '220 x 140 mm'], ['Worktable size', '280 x 200 mm'], ['Forth stroke', '130 mm'], ['Stamping stroke', '75 mm'], ['Center distance', '240 mm'], ['Max. workpiece height', '250 mm'], ['Foil width', '0-300 mm'], ['Power supply', '220 V, 50/60 Hz'], ['Heating power', '250 W x 6'], ['Machine dimensions', '920 x 600 x 1,850 mm'], ['Net weight', '230 kg']],
            features: stampingFeatures,
            applications: stampingApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WFH-2000',
            file: 'wfh-2000.html',
            asset: 'wfh-2000',
            variant: 'Stamping Machines',
            heroEyebrow: 'STAMPING MACHINE',
            type: 'Heavy-duty hot stamping machine',
            catalog: 'Extra-heavy 2,000 kg stamping force hot stamping machine with 400 x 300 mm worktable for large industrial components.',
            description: 'The WFH-2000 is an extra-heavy hot stamping machine with a 2,000 kg stamping force and a 400 x 300 mm worktable. Its high stamping force and large work area make it suitable for stamping on large plastic, metal, and coated industrial components with a maximum workpiece height of 250 mm.',
            specs: [['Stamp force', '2,000 kg'], ['Plate size', '220 x 140 mm'], ['Worktable size', '400 x 300 mm'], ['Stamping stroke', '50 mm'], ['Center distance', '220 mm'], ['Max. workpiece height', '250 mm'], ['Foil width', '0-300 mm'], ['Power supply', '220 V, 50/60 Hz'], ['Heating power', '250 W x 6'], ['Machine dimensions', '780 x 650 x 1,580 mm'], ['Net weight', '255 kg']],
            features: stampingFeatures,
            applications: stampingApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WFH-300/400X',
            file: 'wfh-300400X.html',
            asset: 'wfh-300400X',
            variant: 'Stamping Machines',
            heroEyebrow: 'STAMPING MACHINE',
            type: 'Wide-format hot stamping machine',
            catalog: 'Wide-format hot stamping machine with 100 x 400 mm plate and 450 mm forth stroke for elongated components.',
            description: 'The WFH-300/400X is a wide-format hot stamping machine with a 100 x 400 mm plate, a 450 mm forth stroke, and a 300 kg stamping force. Its extended plate width and stroke length accommodate elongated components such as pen shafts, panel edges, and trim pieces.',
            specs: [['Stamp force', '300 kg'], ['Plate size', '100 x 400 mm'], ['Forth stroke', '450 mm'], ['Stamping stroke', '75 mm'], ['Max. workpiece height', '100 mm'], ['Foil width', '0-300 mm'], ['Power supply', '380 V, 50/60 Hz'], ['Heating power', '5,500 W'], ['Machine dimensions', '1,320 x 600 x 1,580 mm'], ['Net weight', '380 kg']],
            features: stampingFeatures,
            applications: stampingApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WFH-150A1',
            file: 'wfh-150A1.html',
            asset: 'wfh-150A1',
            variant: 'Stamping Machines',
            heroEyebrow: 'STAMPING MACHINE',
            type: 'Fully automatic hot stamping machine',
            catalog: 'Fully automatic hot stamping machine for round bottles and caps at up to 3,600 pcs/hr.',
            description: 'The WFH-150A1 is a fully automatic hot stamping machine designed for continuous high-speed production on round bottles and caps. It handles bottle diameters from 20 to 45 mm and cap lengths from 25 to 70 mm, delivering up to 3,600 pieces per hour with automated feeding and discharge.',
            specs: [['Bottle diameter', '20-45 mm'], ['Cap length', '25-70 mm'], ['Air supply', '0.5-0.7 MPa'], ['Production speed', '3,600 pcs/hr'], ['Power supply', '220 V, 50/60 Hz'], ['Rated power', '5 kW'], ['Working pressure', '6 bar'], ['Machine dimensions', '2,140 x 1,820 x 2,005 mm']],
            features: autoStampingFeatures,
            applications: [
                ['fa-wine-bottle', 'Bottle Caps', 'Automated stamping on round plastic and metal bottle caps at high production speeds.'],
                ['fa-flask', 'Cosmetic Containers', 'Stamping on cosmetic jars, tubes, and containers for branded decoration.'],
                ['fa-pen-fancy', 'Pen Shafts', 'Cylindrical stamping on pen shafts and similar elongated round products.'],
                ['fa-tag', 'Trademarks & Logos', 'Logo and trademark stamping on caps, closures, and small components.']
            ],
            applicationIntro: 'The WFH-150A1 is a fully automatic hot stamping machine designed for round bottles and caps, cosmetic containers, and cylindrical components requiring continuous high-speed foil stamping.',
            hasTechnicalDrawing: false,
            hasCloseUp: false
        },
        {
            id: 'WFH-150A/R8',
            file: 'wfh-150AR8.html',
            asset: 'wfh-150A1',
            variant: 'Stamping Machines',
            heroEyebrow: 'STAMPING MACHINE',
            type: 'Fully automatic hot stamping machine',
            catalog: 'Fully automatic hot stamping machine with 80 x 150 mm hot plate for caps and containers at 2,500 pcs/hr.',
            description: 'The WFH-150A/R8 is a fully automatic hot stamping machine with a 2,500 pcs/hr output rate and an 80 x 150 mm hot plate. It handles workpieces from 18-45 mm diameter and 20-85 mm in height, making it suitable for bottle caps, cosmetic containers, and similar small components.',
            specs: [['Production speed', '2,500 pcs/hr'], ['Hot plate size', '80 x 150 mm'], ['Workpiece diameter', '18-45 mm'], ['Workpiece length', '145 mm'], ['Workpiece height', '20-85 mm'], ['Rated power', '4.5 kW'], ['Power supply', '380 V, 50/60 Hz'], ['Air supply', '5-7 bar'], ['Net weight', '1,800 kg'], ['Machine dimensions', '1,950 x 1,550 x 1,800 mm']],
            features: autoStampingFeatures,
            applications: [
                ['fa-wine-bottle', 'Bottle Caps', 'Automatic stamping on round plastic and metal bottle caps.'],
                ['fa-flask', 'Cosmetic Containers', 'Stamping on cosmetic jars, compacts, and personal-care packaging.'],
                ['fa-pen-fancy', 'Pen Shafts', 'Cylindrical stamping on pen bodies and elongated round components.'],
                ['fa-tag', 'Trademarks & Logos', 'Logo and trademark stamping on caps, closures, and small components.']
            ],
            applicationIntro: 'The WFH-150A/R8 is a fully automatic hot stamping machine for high-speed production on bottle caps, cosmetic containers, and small cylindrical components.',
            hasTechnicalDrawing: false,
            hasCloseUp: false
        },
        {
            id: 'WFH-40AS38P280',
            file: 'wfh-40AS38P280.html',
            asset: 'wfh-40AS38P280',
            variant: 'Heat Transfer',
            heroEyebrow: 'HEAT TRANSFER MACHINE',
            type: 'Pneumatic heat transfer machine',
            catalog: 'Floor-standing heat transfer machine with silicone roller for flat, round, and curved surface printing at 400 kg force.',
            description: 'The WFH-40AS38P280 is a floor-standing heat transfer machine with a 400 kg stamping force and a 100 x 30-150 mm silicone roller. Its micro-computer control with delay and stamping force settings supports high-precision transfer on plastics, wood, caps, bottles, pens, panels, and labels. The 480 x 280 mm worktable with 380 mm stroke handles flat, round, and curved surfaces.',
            specs: [['Stamp force', '400 kg'], ['Silicone roller', '100 x 30-150 mm'], ['Worktable size', '480 x 280 mm'], ['Worktable stroke', '380 mm'], ['Forth stroke', '280 mm'], ['Stamping stroke', '70 mm'], ['Center distance', '240 mm'], ['Max. workpiece height', '150 mm'], ['Power supply', '220 V, 50/60 Hz'], ['Motor power', '250 W x 6'], ['Machine dimensions', '1,480 x 680 x 1,950 mm'], ['Net weight', '400 kg']],
            features: heatTransferFeatures,
            applications: heatTransferApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WFH-300AS/4',
            file: 'wfh-300AS4.html',
            asset: 'wfh-300AS4',
            variant: 'Heat Transfer',
            heroEyebrow: 'HEAT TRANSFER MACHINE',
            type: 'Floor-standing heat transfer machine',
            catalog: 'Floor-standing heat transfer machine with 300 kg force and 100 x 30-300 mm silicone roller for wide-format transfer.',
            description: 'The WFH-300AS/4 is a floor-standing heat transfer machine with a 300 kg stamping force and a 100 x 30-300 mm silicone roller. Its PLC-controlled servo-driven system and ground-precision cylinder main shaft deliver clean, repeatable transfers on bottle caps, cosmetic cases, key buckles, pen shafts, and trademarks.',
            specs: [['Stamp force', '300 kg'], ['Silicone roller', '100 x 30-300 mm'], ['Worktable size', '400 x 300 mm'], ['Stroke', '380 mm'], ['Stamping stroke', '70 mm'], ['Center distance', '240 mm'], ['Max. workpiece height', '200 mm'], ['Power supply', '220 V, 50/60 Hz'], ['Motor power', '500 W x 6'], ['Machine dimensions', '1,350 x 600 x 1,950 mm'], ['Net weight', '260 kg']],
            features: heatTransferFeatures,
            applications: heatTransferApplications,
            hasTechnicalDrawing: true,
            hasCloseUp: true
        },
        {
            id: 'WG-7832/4/3UV',
            file: 'wg-783243UV.html',
            asset: 'wg-783243UV',
            imageDir: 'pad-printing',
            variant: 'Offset Printer',
            heroEyebrow: 'OFFSET PRINTER',
            type: 'Fully automatic UV offset printing line',
            catalog: 'Fully automatic UV offset printing line for 1-4 colour printing and lacquering on round plastic bottle caps.',
            description: 'The WG-7832/4/3UV is a fully automatic UV offset printing production line for round plastic bottle caps. It handles products from 28-38 mm diameter with up to 4 colours plus lacquer, UV curing on each station, a large-capacity stocker with elevator unscrambler, and automatic discharging and packing. Production speeds reach up to 90,000 pcs/hr across a 15 m line.',
            specs: [['Product size', '(28-38) x (19-22) mm'], ['Max. printing diameter', '34 mm'], ['Max. running speed', '90,000 pcs/hr'], ['Print colours', '1-4 colours + lacquer'], ['UV lamp power', '1.8 kW each'], ['UV stations', '3'], ['Power supply', '380 V, 3-phase, 50 Hz (47 A); 220 V (62 A)'], ['Air supply', '5-7 bar'], ['Total power consumption', '18 kW'], ['Machine dimensions', '6,400 x 1,500 x 1,700 mm'], ['Machine net weight', '6,400 kg'], ['Production line dimensions', '15,000 x 3,200 x 2,600 mm']],
            features: offsetFeatures,
            applications: [
                ['fa-wine-bottle', 'Mineral Water Caps', 'Fully automatic UV offset printing on round plastic mineral water and beverage caps.'],
                ['fa-flask', 'Beverage Closures', 'Multi-colour decoration on plastic bottle caps and closures for the beverage industry.'],
                ['fa-tag', 'Brand Labelling', 'High-resolution brand graphics and product information on cap surfaces.']
            ],
            applicationImage: 'application-areas.jpg',
            applicationIntro: 'The WG-7832/4/3UV is a fully automatic UV offset printing production line designed for high-speed multi-colour printing on round plastic bottle caps for the mineral water and beverage industries.',
            hasTechnicalDrawing: false,
            hasCloseUp: true
        }
    ];

    const escapeHtml = function (value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character];
        });
    };

    const imageBase = function (model) {
        return '../images/machines/' + (model.imageDir || 'hot-stamping') + '/' + model.asset + '/';
    };

    const feature = function (icon, title, text) {
        return '<div class="feature-box"><div class="feature-icon"><i class="fa-solid ' + icon + '" aria-hidden="true"></i></div><div><h3>' + escapeHtml(title) + '</h3><p>' + escapeHtml(text) + '</p></div></div>';
    };

    const renderApplications = function (model) {
        const intro = 'Winon applies this machine to hot stamping, heat transfer, and offset printing on plastics, metal, coated surfaces, and packaging components. Special configurations are available for specific customer requirements.';

        if (!model.hasTechnicalDrawing) {
            const applicationCards = model.applications.map(function (item) {
                return '<article class="application-card"><div class="application-icon"><i class="fa-solid ' + item[0] + '" aria-hidden="true"></i></div><h3>' + escapeHtml(item[1]) + '</h3><p>' + escapeHtml(item[2]) + '</p></article>';
            }).join('');
            const applicationImage = model.applicationImage
                ? '<div class="application-area-layout"><div class="application-area-image"><img src="' + imageBase(model) + model.applicationImage + '" alt="Application areas for ' + escapeHtml(model.id) + '"></div><div class="application-area-content"><h3>Application Areas</h3><p>' + escapeHtml(model.applicationIntro || intro) + '</p></div></div>'
                : '';

            return '<section class="machine-applications" aria-labelledby="applications-title"><div class="section-header"><h2 id="applications-title">Application Areas</h2><p>' + escapeHtml(model.applicationIntro || intro) + '</p></div>' + applicationImage + '<div class="application-grid">' + applicationCards + '</div></section>';
        }

        const cards = model.applications.map(function (item) {
            return '<div class="product-card"><div class="product-icon"><i class="fa-solid ' + item[0] + '" aria-hidden="true"></i></div><h3>' + escapeHtml(item[1]) + '</h3><p>' + escapeHtml(item[2]) + '</p></div>';
        }).join('');

        return '<section class="printable-products" aria-labelledby="products-title"><div class="section-header"><h2 id="products-title">Typical Applications</h2><p>' + escapeHtml(intro) + '</p></div><div class="products-grid">' + cards + '</div></section>';
    };

    const renderDrawing = function (model) {
        const base = imageBase(model);
        const name = 'Winon ' + model.id;

        return '<section class="machine-drawing" aria-labelledby="drawing-title"><div class="section-header"><h2 id="drawing-title">Technical Drawing</h2><p>Use the drawing as an installation and layout reference. Confirm final space, utilities, tooling, and production requirements with Printway before installation.</p></div><div class="drawing-container"><img src="' + base + 'technical-drawing.jpg" alt="Technical drawing of ' + escapeHtml(name) + '"></div><div class="drawing-info"><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-ruler-combined" aria-hidden="true"></i></div><h3>Machine Dimensions</h3><p>Reference the drawing when planning the machine footprint and work area.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-industry" aria-hidden="true"></i></div><h3>Production Layout</h3><p>Plan the operator position, fixture access, and surrounding production flow.</p></div><div class="drawing-card"><div class="drawing-icon"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i></div><h3>Installation Review</h3><p>Confirm electrical, compressed-air, tooling, and safety requirements before installation.</p></div></div></section>';
    };

    const renderCatalogue = function () {
        Object.keys(gridMap).forEach(function (variant) {
            const gridId = gridMap[variant];
            const grid = document.getElementById(gridId);
            if (!grid) return;

            const models = definitions.filter(function (m) { return m.variant === variant; });
            grid.innerHTML = models.map(function (model) {
                return '<article class="machine-product-card"><img src="' + imageBase(model) + 'main-photo.jpg" alt="Winon ' + escapeHtml(model.id) + ' ' + escapeHtml(model.type) + '"><div class="machine-product-content"><span>' + escapeHtml(model.variant) + '</span><h2>' + escapeHtml(model.id) + '</h2><p>' + escapeHtml(model.catalog) + '</p><a href="' + model.file + '" class="machine-btn">View details <i class="fas fa-arrow-right" aria-hidden="true"></i></a></div></article>';
            }).join('');
        });
    };

    const renderDetail = function (model) {
        const main = document.querySelector('main');
        if (!main) return;

        const name = 'Winon ' + model.id;
        const base = imageBase(model);
        const quote = '../index.html?model=' + encodeURIComponent(name) + '#contact';
        const details = [['Model', model.id], ['Series', model.variant]].concat(model.specs || []).map(function (item) {
            return '<tr><th scope="row">' + escapeHtml(item[0]) + '</th><td>' + escapeHtml(item[1]) + '</td></tr>';
        }).join('');
        const featurePhoto = model.hasCloseUp ? base + 'close-up.jpg' : base + 'main-photo.jpg';
        const featurePhotoAlt = model.hasCloseUp ? 'Close-up of ' + name : name;
        const features = model.features.map(function (item) {
            return feature(item[0], item[1], item[2]);
        }).join('');

        document.title = name + ' | ' + model.variant + ' | Printway';
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute('content', name + ' ' + model.type.toLowerCase() + ' from Printway Marketing & Services.');
        }

        main.innerHTML =
            '<section class="machine-hero" aria-labelledby="machine-title"><div class="machine-main-photo"><img src="' + base + 'main-photo.jpg" alt="' + escapeHtml(name) + ' ' + escapeHtml(model.type) + '"></div><div class="machine-information"><p class="machine-eyebrow">' + escapeHtml(model.heroEyebrow) + '</p><h1 id="machine-title">' + escapeHtml(name) + '</h1><h2>' + escapeHtml(model.type) + '</h2><p class="machine-brand">Winon Industrial Co., Ltd. &mdash; Hong Kong</p><p>' + escapeHtml(model.description) + '</p><h3>Technical Details</h3><table class="machine-spec-table"><tbody>' + details + '</tbody></table><p class="machine-spec-note">Specifications are based on Winon\'s published product listing. Confirm available options, tooling, fixtures, and final production suitability with Printway.</p></div></section>' +
            '<section class="machine-feature-section" aria-labelledby="features-title"><div class="feature-image"><img src="' + featurePhoto + '" alt="' + escapeHtml(featurePhotoAlt) + '"></div><div class="feature-content"><p class="machine-eyebrow">' + escapeHtml(model.heroEyebrow) + '</p><h2 id="features-title">Production Features</h2><div class="feature-list">' + features + '</div></div></section>' +
            renderApplications(model) +
            (model.hasTechnicalDrawing ? renderDrawing(model) : '') +
            '<section class="machine-contact-box" aria-labelledby="contact-title"><h2 id="contact-title">Interested in the ' + escapeHtml(name) + '?</h2><p>Contact Printway Marketing &amp; Services for pricing, machine configuration, product testing, spare parts, consumables, and technical support.</p><a href="' + quote + '" class="quote-button">Request a Quote</a></section>';

        const floatingQuote = document.querySelector('.quote-floating');
        if (floatingQuote) {
            floatingQuote.href = quote;
        }
    };

    const currentFile = window.location.pathname.split('/').pop().toLowerCase();
    const currentModel = definitions.find(function (model) {
        return model.file.toLowerCase() === currentFile;
    });

    if (currentModel) {
        renderDetail(currentModel);
    } else {
        renderCatalogue();
    }
}());

/* ==========================================
   TOGAWA HOSES CATALOGUE FILTER
========================================== */

(function () {
    const grid = document.getElementById('hose-grid');
    if (!grid) { return; }

    const cards = Array.prototype.slice.call(grid.querySelectorAll('.hose-card'));
    const typeButtons = document.querySelectorAll('.hose-filter-row[data-filter-group="type"] .hose-filter-btn');
    const fluidButtons = document.querySelectorAll('.hose-filter-row[data-filter-group="fluid"] .hose-filter-btn');

    let activeType = '';
    let activeFluid = '';

    const applyFilter = function () {
        let visible = 0;

        cards.forEach(function (card) {
            const matchesType = !activeType || card.getAttribute('data-type') === activeType;
            const fluids = (card.getAttribute('data-fluid') || '').split(' ');
            const matchesFluid = !activeFluid || fluids.indexOf(activeFluid) !== -1;

            const show = matchesType && matchesFluid;
            card.style.display = show ? '' : 'none';
            if (show) { visible += 1; }
        });

        const counter = document.querySelector('.hose-result-count');
        if (counter) {
            counter.textContent = visible + ' of ' + cards.length + ' products';
        }
    };

    const setActive = function (buttons, current) {
        buttons.forEach(function (button) {
            button.classList.toggle('active', button === current);
        });
    };

    typeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            setActive(typeButtons, button);
            activeType = button.getAttribute('data-type-filter') || '';
            applyFilter();
        });
    });

    fluidButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            setActive(fluidButtons, button);
            activeFluid = button.getAttribute('data-fluid-filter') || '';
            applyFilter();
        });
    });

    applyFilter();
}());
