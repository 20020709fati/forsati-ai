const specialties = [
  'تحليل البيانات',
  'تطوير تطبيقات',
  'المالية',
  'الهندسة المدنية',
  'التسويق الرقمي',
  'المحاسبة',
  'إدارة مشاريع',
  'تطوير الويب',
  'الذكاء الاصطناعي',
  'الدعم التقني',
  'الموارد البشرية',
  'التصميم الجرافيكي'
];

const demoJobs = [
  {
    id: 'job-001',
    title: 'مطور تطبيقات ويب',
    employer: 'شركة أفق التقنية',
    city: 'الدار البيضاء',
    publicationDate: '2026-10-20',
    source: 'LinkedIn',
    deadline: '2026-11-05',
    sector: 'خاص',
    specialty: 'تطوير تطبيقات',
    category: 'منافسة توظيف',
    link: '#',
    matchScore: 96,
    requirements: ['JavaScript', 'React', 'API', 'Git']
  },
  {
    id: 'job-002',
    title: 'محلل بيانات',
    employer: 'المصرف المغربي للتنمية',
    city: 'الرباط',
    publicationDate: '2026-10-18',
    source: 'MoroccoJobs',
    deadline: '2026-11-01',
    sector: 'عمومي',
    specialty: 'تحليل البيانات',
    category: 'منافسة توظيف',
    link: '#',
    matchScore: 94,
    requirements: ['SQL', 'Power BI', 'Excel', 'إحصاء']
  },
  {
    id: 'job-003',
    title: 'مهندس مدني',
    employer: 'وزارة التجهيز والماء',
    city: 'فاس',
    publicationDate: '2026-10-15',
    source: 'Offres Maroc',
    deadline: '2026-10-30',
    sector: 'عمومي',
    specialty: 'الهندسة المدنية',
    category: 'منافسة توظيف',
    link: '#',
    matchScore: 88,
    requirements: ['AutoCAD', 'التخطيط', 'المشاريع', 'التحليل']
  },
  {
    id: 'job-004',
    title: 'مسؤول تسويق رقمي',
    employer: 'دار النشر المغربية',
    city: 'مراكش',
    publicationDate: '2026-10-22',
    source: 'Rekrute',
    deadline: '2026-11-10',
    sector: 'خاص',
    specialty: 'التسويق الرقمي',
    category: 'خاص',
    link: '#',
    matchScore: 91,
    requirements: ['SEO', 'Google Ads', 'Social Media', 'Analytics']
  },
  {
    id: 'job-005',
    title: 'خبير مالية وتحليل',
    employer: 'شركة كايزن للاستشارات',
    city: 'طنجة',
    publicationDate: '2026-10-12',
    source: 'JobMaroc',
    deadline: '2026-10-28',
    sector: 'خاص',
    specialty: 'المالية',
    category: 'خاص',
    link: '#',
    matchScore: 86,
    requirements: ['Excel', 'التحليل المالي', 'الميزانية', 'الاستراتيجية']
  },
  {
    id: 'job-006',
    title: 'مساعد إدارة مشاريع',
    employer: 'بلدية الرباط',
    city: 'الرباط',
    publicationDate: '2026-10-17',
    source: 'Jeune Afrique',
    deadline: '2026-11-02',
    sector: 'عمومي',
    specialty: 'إدارة مشاريع',
    category: 'منافسة توظيف',
    link: '#',
    matchScore: 82,
    requirements: ['MS Project', 'التخطيط', 'التواصل', 'الجدولة']
  }
];

const cvProfile = {
  name: 'مراد طارق',
  specialties: ['تحليل البيانات', 'تطوير تطبيقات', 'إدارة مشاريع'],
  skills: ['Python', 'SQL', 'Excel', 'Power BI', 'JavaScript', 'React', 'Git', 'إدارة المشاريع']
};

const state = {
  selectedSpecialties: [...cvProfile.specialties],
  favorites: new Set(['job-001']),
  filters: {
    city: 'الكل',
    specialty: 'الكل',
    sector: 'الكل',
    search: '',
    sort: 'match'
  },
  suggestions: ['تحليل البيانات', 'تطوير تطبيقات', 'إدارة مشاريع']
};

const elements = {
  specialtyList: document.getElementById('specialtyList'),
  selectedCount: document.getElementById('selectedCount'),
  suggestedSpecialties: document.getElementById('suggestedSpecialties'),
  cvUpload: document.getElementById('cvUpload'),
  cvFileName: document.getElementById('cvFileName'),
  cityFilter: document.getElementById('cityFilter'),
  specialtyFilter: document.getElementById('specialtyFilter'),
  sectorFilter: document.getElementById('sectorFilter'),
  sortFilter: document.getElementById('sortFilter'),
  searchInput: document.getElementById('searchInput'),
  clearFilters: document.getElementById('clearFilters'),
  resultsCount: document.getElementById('resultsCount'),
  jobList: document.getElementById('jobList'),
  favoritesList: document.getElementById('favoritesList'),
  refreshSuggestions: document.getElementById('refreshSuggestions')
};

function renderSpecialtySelector() {
  elements.specialtyList.innerHTML = specialties
    .map(
      (specialty) => `
        <label class="specialty-item">
          <input type="checkbox" value="${specialty}" ${state.selectedSpecialties.includes(specialty) ? 'checked' : ''} />
          <span>${specialty}</span>
        </label>
      `
    )
    .join('');

  elements.selectedCount.textContent = state.selectedSpecialties.length;

  elements.specialtyList.querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', (event) => {
      const specialty = event.target.value;
      if (event.target.checked) {
        if (!state.selectedSpecialties.includes(specialty)) {
          state.selectedSpecialties.push(specialty);
        }
      } else {
        state.selectedSpecialties = state.selectedSpecialties.filter((item) => item !== specialty);
      }
      updateFilters();
      renderEverything();
    });
  });
}

function renderSuggestions() {
  elements.suggestedSpecialties.innerHTML = state.suggestions
    .map(
      (specialty) => `
        <span data-specialty="${specialty}" class="suggestion-tag">${specialty}</span>
      `
    )
    .join('');

  elements.suggestedSpecialties.querySelectorAll('span').forEach((tag) => {
    tag.addEventListener('click', () => {
      const specialty = tag.dataset.specialty;
      if (!state.selectedSpecialties.includes(specialty)) {
        state.selectedSpecialties.push(specialty);
      }
      renderEverything();
    });
  });
}

function getFilteredJobs() {
  const filtered = demoJobs.filter((job) => {
    const matchesCity = state.filters.city === 'الكل' || job.city === state.filters.city;
    const matchesSpecialty = state.filters.specialty === 'الكل' || job.specialty === state.filters.specialty;
    const matchesSector = state.filters.sector === 'الكل' || job.sector === state.filters.sector || job.category === state.filters.sector;
    const matchesSearch = !state.filters.search || [job.title, job.employer, job.city, job.specialty].join(' ').toLowerCase().includes(state.filters.search.toLowerCase());

    return matchesCity && matchesSpecialty && matchesSector && matchesSearch;
  });

  filtered.sort((a, b) => {
    if (state.filters.sort === 'date') {
      return new Date(b.publicationDate) - new Date(a.publicationDate);
    }
    if (state.filters.sort === 'deadline') {
      return new Date(a.deadline) - new Date(b.deadline);
    }
    return b.matchScore - a.matchScore;
  });

  return filtered;
}

function renderJobs() {
  const jobs = getFilteredJobs();
  elements.resultsCount.textContent = jobs.length;

  if (!jobs.length) {
    elements.jobList.innerHTML = `
      <div class="empty-state">
        لا توجد فرص توظيف متوافقة مع المرشحات الحالية.<br />جرّب تغيير المدينة أو التخصص أو إلغاء بعض الفلاتر.
      </div>
    `;
    return;
  }

  const template = document.getElementById('jobCardTemplate');
  elements.jobList.innerHTML = '';

  jobs.forEach((job) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector('.job-title').textContent = job.title;
    fragment.querySelector('.job-employer').textContent = job.employer;
    fragment.querySelector('.city').textContent = job.city;
    fragment.querySelector('.sector').textContent = job.sector;
    fragment.querySelector('.source').textContent = job.source;
    fragment.querySelector('.date').textContent = formatDate(job.publicationDate);
    fragment.querySelector('.deadline').textContent = formatDate(job.deadline);
    fragment.querySelector('.sector-text').textContent = job.specialty;
    fragment.querySelector('.score').textContent = `${job.matchScore}%`;
    fragment.querySelector('.link-btn').addEventListener('click', () => {
      window.open(job.link, '_blank', 'noopener,noreferrer');
    });

    const favoriteButton = fragment.querySelector('.favorite-btn');
    const isFavorite = state.favorites.has(job.id);
    favoriteButton.textContent = isFavorite ? '★' : '☆';
    favoriteButton.classList.toggle('active', isFavorite);
    favoriteButton.addEventListener('click', () => {
      toggleFavorite(job.id);
      renderEverything();
    });

    elements.jobList.appendChild(fragment);
  });
}

function renderFavorites() {
  const favoriteJobs = demoJobs.filter((job) => state.favorites.has(job.id));

  if (!favoriteJobs.length) {
    elements.favoritesList.innerHTML = `
      <div class="empty-state">
        لا توجد وظائف محفوظة حاليًا.
      </div>
    `;
    return;
  }

  elements.favoritesList.innerHTML = favoriteJobs
    .map(
      (job) => `
        <div class="job-card">
          <div class="job-top-row">
            <div>
              <div class="job-title">${job.title}</div>
              <div class="job-employer">${job.employer}</div>
            </div>
            <button class="favorite-btn active" data-id="${job.id}">★</button>
          </div>
          <div class="job-meta">
            <span class="pill">${job.city}</span>
            <span class="pill">${job.sector}</span>
            <span class="pill">${job.source}</span>
          </div>
          <div class="job-details">
            <div><span>تاريخ النشر</span><strong>${formatDate(job.publicationDate)}</strong></div>
            <div><span>آخر موعد</span><strong>${formatDate(job.deadline)}</strong></div>
            <div><span>مطابقة</span><strong>${job.matchScore}%</strong></div>
          </div>
        </div>
      `
    )
    .join('');

  elements.favoritesList.querySelectorAll('.favorite-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      state.favorites.delete(id);
      renderEverything();
    });
  });
}

function updateFilters() {
  state.filters.city = elements.cityFilter.value;
  state.filters.specialty = elements.specialtyFilter.value;
  state.filters.sector = elements.sectorFilter.value;
  state.filters.sort = elements.sortFilter.value;
  state.filters.search = elements.searchInput.value.trim();
}

function toggleFavorite(jobId) {
  if (state.favorites.has(jobId)) {
    state.favorites.delete(jobId);
  } else {
    state.favorites.add(jobId);
  }
}

function renderEverything() {
  renderSpecialtySelector();
  renderSuggestions();
  renderJobs();
  renderFavorites();
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ar-MA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

function generateSuggestedSpecialties() {
  const basedOnCv = cvProfile.skills.join(' ');
  const matches = specialties.filter((specialty) => {
    const term = specialty.toLowerCase();
    return (
      basedOnCv.toLowerCase().includes(term.split(' ')[0].toLowerCase()) ||
      term.includes('بيانات') && basedOnCv.toLowerCase().includes('sql') ||
      term.includes('تطبيق') && basedOnCv.toLowerCase().includes('react') ||
      term.includes('مشاريع') && basedOnCv.toLowerCase().includes('project')
    );
  });

  state.suggestions = matches.length ? matches : ['تحليل البيانات', 'تطوير تطبيقات', 'إدارة مشاريع'];
}

function attachHandlers() {
  elements.cvUpload.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      if (!isPdf) {
        alert('يرجى اختيار ملف PDF فقط.');
        return;
      }

      elements.cvFileName.textContent = file.name;
      generateSuggestedSpecialties();
      renderEverything();
    }
  });

  elements.cityFilter.addEventListener('change', updateFilters);
  elements.specialtyFilter.addEventListener('change', updateFilters);
  elements.sectorFilter.addEventListener('change', updateFilters);
  elements.sortFilter.addEventListener('change', updateFilters);
  elements.searchInput.addEventListener('input', updateFilters);

  elements.clearFilters.addEventListener('click', () => {
    elements.cityFilter.value = 'الكل';
    elements.specialtyFilter.value = 'الكل';
    elements.sectorFilter.value = 'الكل';
    elements.sortFilter.value = 'match';
    elements.searchInput.value = '';
    state.filters = {
      city: 'الكل',
      specialty: 'الكل',
      sector: 'الكل',
      search: '',
      sort: 'match'
    };
    renderEverything();
  });

  elements.refreshSuggestions.addEventListener('click', () => {
    generateSuggestedSpecialties();
    renderEverything();
  });
}

generateSuggestedSpecialties();
attachHandlers();
renderEverything();
