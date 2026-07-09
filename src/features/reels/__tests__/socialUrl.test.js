import { describe, it, expect } from 'vitest';
import {
  plataformaDe,
  esVideoFacebook,
  validarSocialUrl,
  normalizarSocialUrl,
} from '../socialUrl.js';

describe('plataformaDe', () => {
  it('detecta reels y posts de Instagram', () => {
    expect(plataformaDe('https://www.instagram.com/reel/DZYAXX1jquI/')).toBe('instagram');
    expect(plataformaDe('https://instagram.com/p/ABC123/')).toBe('instagram');
  });

  it('detecta URLs de Facebook con y sin www/m/web', () => {
    expect(plataformaDe('https://www.facebook.com/story.php?story_fbid=1&id=2')).toBe('facebook');
    expect(plataformaDe('https://m.facebook.com/reel/123/')).toBe('facebook');
    expect(plataformaDe('https://facebook.com/pagina/posts/123')).toBe('facebook');
  });

  it('devuelve null para otras URLs', () => {
    expect(plataformaDe('https://www.youtube.com/watch?v=x')).toBe(null);
    expect(plataformaDe('https://www.instagram.com/turismoentafidelvalle')).toBe(null);
  });
});

describe('esVideoFacebook', () => {
  it('detecta reels, videos y watch', () => {
    expect(esVideoFacebook('https://www.facebook.com/reel/123456/')).toBe(true);
    expect(esVideoFacebook('https://www.facebook.com/pagina/videos/123/')).toBe(true);
    expect(esVideoFacebook('https://www.facebook.com/watch/?v=123')).toBe(true);
  });

  it('los posts (incluido story.php) no son video: usan el plugin de post', () => {
    expect(esVideoFacebook('https://www.facebook.com/story.php?story_fbid=1&id=2')).toBe(false);
    expect(esVideoFacebook('https://www.facebook.com/pagina/posts/123')).toBe(false);
  });
});

describe('validarSocialUrl', () => {
  it('acepta Instagram y Facebook canónicos', () => {
    expect(validarSocialUrl('https://www.instagram.com/reel/DZYAXX1jquI/').ok).toBe(true);
    expect(validarSocialUrl('https://www.facebook.com/story.php?story_fbid=1&id=2').ok).toBe(true);
    expect(validarSocialUrl('https://www.facebook.com/reel/123/').ok).toBe(true);
  });

  it('acepta las demás formas de contenido de Facebook', () => {
    expect(validarSocialUrl('https://www.facebook.com/pagina/posts/123').ok).toBe(true);
    expect(validarSocialUrl('https://www.facebook.com/pagina/videos/123/').ok).toBe(true);
    expect(validarSocialUrl('https://www.facebook.com/watch/?v=123').ok).toBe(true);
    expect(validarSocialUrl('https://www.facebook.com/photo/?fbid=123').ok).toBe(true);
    expect(validarSocialUrl('https://www.facebook.com/permalink.php?story_fbid=1&id=2').ok).toBe(true);
  });

  it('rechaza links de compartir de Facebook con instrucciones', () => {
    const r = validarSocialUrl('https://www.facebook.com/share/p/18gNu9sNU2/');
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/compartir/);
    expect(r.error).toMatch(/barra del navegador/);
    expect(validarSocialUrl('https://www.facebook.com/share/r/1BCA84Sd12/').ok).toBe(false);
  });

  it('rechaza perfiles/páginas de Facebook que no son publicaciones', () => {
    const r = validarSocialUrl('https://www.facebook.com/MunicipalidadTafi');
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/perfil o página/);
    expect(validarSocialUrl('https://www.facebook.com/').ok).toBe(false);
    expect(validarSocialUrl('https://www.facebook.com/groups/123/').ok).toBe(false);
  });

  it('rechaza vacío y URLs de otros sitios', () => {
    expect(validarSocialUrl('').ok).toBe(false);
    expect(validarSocialUrl('  ').ok).toBe(false);
    expect(validarSocialUrl('https://www.youtube.com/watch?v=x').ok).toBe(false);
  });
});

describe('normalizarSocialUrl', () => {
  it('Instagram: quita query params y asegura barra final', () => {
    expect(normalizarSocialUrl('https://www.instagram.com/reel/DZYAXX1jquI/?igsh=ZjFk'))
      .toBe('https://www.instagram.com/reel/DZYAXX1jquI/');
    expect(normalizarSocialUrl('https://www.instagram.com/reel/DZYAXX1jquI'))
      .toBe('https://www.instagram.com/reel/DZYAXX1jquI/');
  });

  it('Facebook: conserva los params que identifican al contenido', () => {
    expect(normalizarSocialUrl('https://www.facebook.com/story.php?story_fbid=1336951168525290&id=100066312592917'))
      .toBe('https://www.facebook.com/story.php?story_fbid=1336951168525290&id=100066312592917');
    expect(normalizarSocialUrl('https://www.facebook.com/watch/?v=123'))
      .toBe('https://www.facebook.com/watch/?v=123');
  });

  it('Facebook: elimina solo los params de tracking', () => {
    expect(normalizarSocialUrl('https://www.facebook.com/story.php?story_fbid=1&id=2&rdid=Xyz&mibextid=abc'))
      .toBe('https://www.facebook.com/story.php?story_fbid=1&id=2');
  });
});
