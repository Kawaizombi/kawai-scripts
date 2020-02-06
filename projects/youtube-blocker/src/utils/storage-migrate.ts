import GMStorage from '@kawai-scripts/gm-storage';

// WAT? Why? Backward compatibility
// In old version state stored under 'youtube-blocker-state' key
// but in new it must be stored under '@@STATE' key
export async function migrate() {
  const OLD_KEY = 'youtube-blocker-state';
  const NEW_KEY = '@@STATE';
  const storage = new GMStorage();
  const oldStorage = await storage.getValue(OLD_KEY);
  const newStorage = await storage.getValue(NEW_KEY);

  if(!newStorage && oldStorage) {
    await storage.setValue(NEW_KEY, oldStorage);
  }
}
