const form = document.getElementById('search-bar');
const urlInput = document.getElementById('page-url');
const periodSelect = document.getElementById('period');
const urlError = document.getElementById('url-error');
const periodError = document.getElementById('period-error');

function displayUrlError(message) {
  urlError.textContent = message;
  urlError.classList.remove('hidden');

  urlInput.classList.remove('border-gray-300');
  urlInput.classList.add('border-red-500');
  urlInput.classList.add('text-red-500');
}

function hideUrlError() {
  urlError.textContent = '';
  urlError.classList.add('hidden');

  urlInput.classList.add('border-gray-300');
  urlInput.classList.remove('border-red-500');
  urlInput.classList.remove('text-red-500');
}

function displayPeriodError(message) {
  periodError.textContent = message;
  periodError.classList.remove('hidden');

  periodError.classList.remove('border-gray-300');
  periodError.classList.add('border-red-500');
  periodError.classList.add('text-red-500');
}

function hidePeriodError() {
  periodError.textContent = '';
  periodError.classList.add('hidden');

  periodSelect.classList.add('border-gray-300');
  periodSelect.classList.remove('border-red-500');
  periodSelect.classList.remove('text-red-500');
}

function parseWikiUrl(url) {
  const wikiPageUrl = new URL(urlInput.value);
  const segments = url.pathname.split('/').filter(Boolean);
  article = segments[segments.length - 1];

  return [wikiPageUrl.hostname, article];
}

async function handleSearch(event) {
  event.preventDefault();

  let project, article;
  try {
    [project, article] = parseWikiUrl(urlInput.value);
  } catch (error) {
    displayUrlError('Invalid URL. Please enter a valid Wikipedia page URL.');
    return;
  }

  const period = +periodSelect.value;
  let granularity, startDate, prevStartDate;
  switch (period) {
    case 30:
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      prevStartDate = new Date(startDate.getTime() - 30 * 24 * 60 * 60 * 1000);
      granularity = 'daily';
      break;
    case 90:
      startDate = new Date(Date.now() - 91 * 24 * 60 * 60 * 1000);
      prevStartDate = new Date(startDate.getTime() - 91 * 24 * 60 * 60 * 1000);
      granularity = 'weekly';
      break;
    case 365:
      startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
      prevStartDate = new Date(startDate.getTime() - 365 * 24 * 60 * 60 * 1000);
      granularity = 'monthly';
      break;
    default:
      displayPeriodError('Invalid period.');
      return;
  }
  const endDate = new Date(Date.now() - 60 * 60 * 1000);

  // Fetch the data from the server
}

form.addEventListener('submit', handleSearch);
urlInput.addEventListener('input', hideUrlError);
periodSelect.addEventListener('select', hidePeriodError);
