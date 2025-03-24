export async function getGithubProjects() {
  try {
    const response = await fetch('https://api.github.com/users/Frisyk/repos?sort=updated&per_page=100', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub projects');
    }

    const repos = await response.json();
    
    // Filter repos yang bukan fork dan bukan private
    const projects = repos
      .filter(repo => !repo.fork && !repo.private)
      .map((repo, index) => {
        // Menentukan tech stack berdasarkan bahasa dan topik
        let techStack = [];
        if (repo.language) techStack.push(repo.language);
        
        // Menambahkan tech stack berdasarkan topik
        if (repo.topics) {
          const commonTechs = {
            'react': 'React.js',
            'nextjs': 'Next.js',
            'typescript': 'TypeScript',
            'javascript': 'JavaScript',
            'python': 'Python',
            'java': 'Java',
            'kotlin': 'Kotlin',
            'android': 'Android',
            'nodejs': 'Node.js',
            'express': 'Express.js',
            'mongodb': 'MongoDB',
            'postgresql': 'PostgreSQL',
            'tailwindcss': 'TailwindCSS',
            'threejs': 'Three.js',
            'machine-learning': 'Machine Learning',
            'tensorflow': 'TensorFlow',
            'scikit-learn': 'Scikit-learn',
            'fastapi': 'FastAPI',
            'laravel': 'Laravel',
            'php': 'PHP',
            'mysql': 'MySQL'
          };

          repo.topics.forEach(topic => {
            if (commonTechs[topic.toLowerCase()]) {
              techStack.push(commonTechs[topic.toLowerCase()]);
            }
          });
        }

        // Menghapus duplikat tech stack
        techStack = [...new Set(techStack)];

        return {
          id: index + 1,
          title: repo.name,
          desc: `${repo.description || 'No description available'} <br/> Tech Stack: ${techStack.join(', ')}`,
          image: `/project/${repo.name.toLowerCase().replace(/\s+/g, '-')}.png`,
          slug: repo.homepage || repo.html_url,
          github: repo.html_url,
          stars: repo.stargazers_count,
          language: repo.language,
          updatedAt: repo.updated_at
        };
      });

    return projects;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
} 